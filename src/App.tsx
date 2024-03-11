import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<AppRouter />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
