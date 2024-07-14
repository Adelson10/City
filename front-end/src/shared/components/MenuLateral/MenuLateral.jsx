import React from 'react';
import Botao from '../Botao/Botao';

import Logo from '../../../Icons/LogoIcon';
import HomeIcon from '../../../Icons/HomeIcon';
import CityIcon from '../../../Icons/CityIcon';
import UserIcon from '../../../Icons/UserIcon';
import MoonIcon from '../../../Icons/MoonIcon';
import LogoutIcon from '../../../Icons/LogoutIcon';

import './MenuLateral.css';

const MenuLateral = ({children}) => {

  return (
    <>
      <div className='MenuLateral'>
          <div className='IconLogo'>
              <Logo fill='rgba(0,98,15,1)' size='4rem'></Logo>
              <h1>CITY</h1>
          </div>
          <nav className='Nav__Botoes'>
              <div>
                <Botao icon={<HomeIcon cor='rgba(0,98,15,1)' size='1.2rem' className='Button__Icons'/>}>Página inicial</Botao>
                <Botao icon={<CityIcon cor='rgba(0,98,15,1)' size='1.2rem' className='Button__Icons'/>}>Cidades</Botao>
                <Botao icon={<UserIcon cor='rgba(0,98,15,1)' size='1.2rem' className='Button__Icons'/>}>Pessoas</Botao>
              </div>
              <div>
                <Botao icon={<MoonIcon cor='rgba(0,98,15,1)' size='1.2rem' className='Button__Icons'/>}>Alternar Tema</Botao>
                <Botao icon={<LogoutIcon cor='rgba(0,98,15,1)' size='1.2rem' className='Button__Icons'/>}>Página inicial</Botao>
              </div>
          </nav>
      </div>
      {children}
    </>
  )
}

export default MenuLateral;
