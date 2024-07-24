import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import Pessoas from '../pages/Pessoas/Pessoas';
import PessoaDados from '../pages/Pessoas/PessoaDados';
import Cidades from '../pages/Cidades/Cidades';
import CidadeDados from '../pages/Cidades/CidadeDados';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/pagina-inicial' element={<Dashboard />} />
      <Route path='/cidades' element={<Cidades />}/>
      <Route path='/cidades/:detalhe' element={<CidadeDados />}/>
      <Route path='/pessoas' element={<Pessoas />}/>
      <Route path='/pessoas/:detalhe' element={<PessoaDados />}/>
      <Route path='/pessoas/:detalhe/:id' element={<PessoaDados />}/>

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  )
}

export default AppRoutes;