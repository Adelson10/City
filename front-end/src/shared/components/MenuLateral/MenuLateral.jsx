import React, { useState } from 'react';
import Botao from '../Botao/Botao';
import Logo from '../../../Icons/LogoIcon';

import './MenuLateral.css';
import { useNavigate } from 'react-router-dom';
import { useDarkContext } from '../../Hooks/useDarkMode';

const MenuLateral = ({children}) => {
  const path = window.location.pathname;
  const navegation = useNavigate();

  const { style , toggleTheme, ColorBase } = useDarkContext();

  return (
    <>
      <div className='MenuLateral'>
          <div className='IconLogo'>
              <Logo fill={ColorBase} size='4rem'></Logo>
              <h1>CITY</h1>
          </div>
          <nav className='Nav__Botoes'>
              <div>
                <Botao handleClick={() => navegation('/pagina-inicial')} select={path === '/pagina-inicial' ? true : false} icon={{ name: 'home', cor: [ColorBase, style.color ], size: '1.2rem', class: { width: '1.2rem', marginLeft: '1rem' } }}>Página inicial</Botao>
                <Botao handleClick={() => navegation('/cidades')} select={path === '/cidades' ? true : false} icon={{ name: 'business', cor: [ColorBase, style.color], size: '1.2rem', class: { width: '1.2rem', marginLeft: '1rem' } }}>Cidades</Botao>
                <Botao handleClick={() => navegation('/pessoas')} select={path === '/pessoas' ? true : false} icon={{ name: 'user', cor: [ColorBase, style.color], size: '1.2rem', class: { width: '1.2rem', marginLeft: '1rem' } }}>Pessoas</Botao>
              </div>
              <div>
                <Botao handleClick={toggleTheme} icon={{ name: style.icon , cor: [ ColorBase , style.colorIcon ], size: '1.2rem', class: { width: '1.2rem', marginLeft: '1rem' } }}>Alternar Tema</Botao>
                <Botao icon={{ name: 'log-out', cor: [ColorBase, style.color], size: '1.2rem', class: { width: '1.2rem', marginLeft: '1rem' } }}>Página inicial</Botao>
              </div>
          </nav>
      </div>
      {children}
    </>
  )
}

export default MenuLateral;
