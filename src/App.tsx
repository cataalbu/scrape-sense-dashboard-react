import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<AppRouter />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
