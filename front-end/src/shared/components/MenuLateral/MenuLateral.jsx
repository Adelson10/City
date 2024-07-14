import React from 'react';
import Botao from '../Botao/Botao';

import Logo from '../../../Icons/LogoIcon';
import HomeIcon from '../../../Icons/HomeIcon';
import CityIcon from '../../../Icons/CityIcon';
import UserIcon from '../../../Icons/UserIcon';
import MoonIcon from '../../../Icons/MoonIcon';
import LogoutIcon from '../../../Icons/LogoutIcon';

import './MenuLateral.css';
import { useNavigate } from 'react-router-dom';

const MenuLateral = ({children}) => {
  const path = window.location.pathname;
  const navegation = useNavigate();

  return (
    <>
      <div className='MenuLateral'>
          <div className='IconLogo'>
              <Logo fill='rgba(0,98,15,1)' size='4rem'></Logo>
              <h1>CITY</h1>
          </div>
          <nav className='Nav__Botoes'>
              <div>
                <Botao handleClick={() => navegation('/pagina-inicial')} select={path === '/pagina-inicial' ? true : false} icon={<HomeIcon cor='#828282' size='1.2rem' className='Button__Icons'/>}>Página inicial</Botao>
                <Botao handleClick={() => navegation('/cidades')} select={path === '/cidades' ? true : false} icon={<CityIcon cor='#828282' size='1.2rem' className='Button__Icons'/>}>Cidades</Botao>
                <Botao handleClick={() => navegation('/pessoas')} select={path === '/pessoas' ? true : false} icon={<UserIcon cor='#828282' size='1.2rem' className='Button__Icons'/>}>Pessoas</Botao>
              </div>
              <div>
                <Botao icon={<MoonIcon cor='#828282' size='1.2rem' className='Button__Icons'/>}>Alternar Tema</Botao>
                <Botao icon={<LogoutIcon cor='#828282' size='1.2rem' className='Button__Icons'/>}>Página inicial</Botao>
              </div>
          </nav>
      </div>
      {children}
    </>
  )
}

export default MenuLateral;
