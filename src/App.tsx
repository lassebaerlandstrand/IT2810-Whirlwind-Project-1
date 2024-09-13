import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Home from './pages/Home/Home';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
