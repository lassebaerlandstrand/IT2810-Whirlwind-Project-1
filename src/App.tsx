import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Home from './pages/Home/Home';
import Location from './pages/Location/Location';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename='/project1'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/location/:locationName" element={<Location />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
