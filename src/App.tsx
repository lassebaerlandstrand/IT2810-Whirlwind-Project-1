import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider, ScrollRestoration } from 'react-router-dom';
import './App.css';
import { FavoritesProvider } from './contexts/FavoritesContext';
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
    <FavoritesProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </FavoritesProvider>
  );
}

export default App;
