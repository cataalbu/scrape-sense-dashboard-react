import { Route, Routes } from 'react-router-dom';

export default function AppRouter() {
  <Routes>
    {/* Public routes */}

    <Route path="/" element={<div />} />
    <Route element={<div />}>
      <Route path="login" element={<div />} />
      <Route path="register" element={<div />} />
    </Route>

    {/* Private routes */}

    {/* Guest */}

    {/* User */}

    {/* Admin */}
  </Routes>;
}
