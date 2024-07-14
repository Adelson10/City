import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/pagina-inicial' element={<Dashboard />} />
      <Route path='/Cidades' />
      <Route path='/Pessoas' />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  )
}

export default AppRoutes;