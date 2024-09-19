import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { FavoritesProvider } from './FavoritesContext';
import { useFavorites } from './FavoritesFunctions';

vi.unmock('../contexts/FavoritesFunctions');

describe('useFavorites', () => {
  it('throws an error when used outside of FavoritesProvider', () => {
    const { result } = renderHook(() => {
      try {
        return useFavorites();
      } catch (error) {
        return { error };
      }
    });

    expect((result.current as { error: Error }).error).toEqual(
      new Error('useFavorites must be used within a FavoritesProvider'),
    );
  });

  it('returns context when used inside FavoritesProvider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <FavoritesProvider>{children}</FavoritesProvider>;
    const { result } = renderHook(() => useFavorites(), { wrapper });
    expect(result.current).toHaveProperty('favorites');
    expect(result.current).toHaveProperty('toggleFavorite');
  });
});

// Component which uses the useFavorites hook
const TestComponent = () => {
  const { favorites, toggleFavorite } = useFavorites();
  return (
    <div>
      <div data-testid="favorites-list">{favorites.length}</div>
      <button
        onClick={() =>
          toggleFavorite({ city_name: 'New York', country_name: 'USA', latitude: '40.7128', longitude: '-74.006' })
        }
      >
        Toggle New York
      </button>
    </div>
  );
};

describe('FavoritesProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('adds and removes a favorite location', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>,
    );

    expect(screen.getByTestId('favorites-list').textContent).toBe('0');

    fireEvent.click(screen.getByText('Toggle New York'));
    expect(screen.getByTestId('favorites-list').textContent).toBe('1');

    fireEvent.click(screen.getByText('Toggle New York'));
    expect(screen.getByTestId('favorites-list').textContent).toBe('0');
  });

  it('persists favorites to localStorage', () => {
    const mockSetItem = vi.spyOn(Storage.prototype, 'setItem');

    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>,
    );

    fireEvent.click(screen.getByText('Toggle New York'));

    // Expect localStorage.setItem to have been called with updated favorites
    expect(mockSetItem).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify([{ city_name: 'New York', country_name: 'USA', latitude: '40.7128', longitude: '-74.006' }]),
    );
  });
});
