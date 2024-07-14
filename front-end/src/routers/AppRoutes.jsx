import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import Pessoas from '../pages/Pessoas/Pessoas';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/pagina-inicial' element={<Dashboard />} />
      <Route path='/Cidades' element={<Pessoas />}/>
      <Route path='/Pessoas' />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  )
}

export default AppRoutes;