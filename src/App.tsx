import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider, ScrollRestoration } from 'react-router-dom';
import './App.css';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { LocationProvider } from './contexts/LocationContext';
import Home from './pages/Home/Home';
import Location from './pages/Location/Location';

const queryClient = new QueryClient();

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <>
          {/* ScrollRestoration will reset scroll position on navigation */}
          <ScrollRestoration />
          <Home />
        </>
      ),
    },
    {
      path: '/location/:locationName',
      element: (
        <>
          <ScrollRestoration />
          <Location />
        </>
      ),
    },
  ],
  {
    basename: '/project1',
  },
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <LocationProvider>
          <RouterProvider router={router} />
        </LocationProvider>
      </FavoritesProvider>
    </QueryClientProvider>
  );
}

export default App;
