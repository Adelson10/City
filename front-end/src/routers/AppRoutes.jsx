import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import Pessoas from '../pages/Pessoas/Pessoas';
import PessoaDados from '../pages/Pessoas/PessoaDados';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/pagina-inicial' element={<Dashboard />} />
      <Route path='/cidades' />
      <Route path='/pessoas' element={<Pessoas />}/>
      <Route path='/pessoas/:id' element={<PessoaDados />}/>

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  )
}

export default AppRoutes;