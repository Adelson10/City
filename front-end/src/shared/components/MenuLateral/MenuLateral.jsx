import React, { act } from 'react';
import Botao from '../Botao/Botao';
import Logo from '../../../Icons/LogoIcon';

import './MenuLateral.css';
import { useNavigate } from 'react-router-dom';
import { useDarkContext } from '../../Hooks/useDarkMode';
import { useAuthContext } from '../../context/AuthProvider';

const MenuLateral = ({children}) => {
  const path = window.location.pathname;
  const navegation = useNavigate();
  const { layout } = useAuthContext();

  const { style , toggleTheme, ColorBase } = useDarkContext();
  const [width, setWidth] = React.useState(window.screen.width);
  const [active, setActive] = React.useState(false);

  window.addEventListener('resize', () => setWidth(window.screen.width) );

  return (
    <>
      <div>
      <div className={`MenuLateral`} style={{display: active || width > 960 ? 'flex' : 'none'}}>
          <div className='IconLogo'>
              <Logo fill={ColorBase} size='4rem'></Logo>
              <h1>CITY</h1>
          </div>
          <nav className='Nav__Botoes'>
              <div>
                <Botao handleClick={() => {navegation('/pagina-inicial'); setActive(false);}} select={path === '/pagina-inicial' ? true : false} icon={{ name: 'home', cor: [ColorBase, style.color ], size: '1.2rem', class: { width: '1.2rem', marginLeft: '1rem' } }}>Página inicial</Botao>
                <Botao handleClick={() =>{ navegation('/cidades'); setActive(false);}} select={path === '/cidades' ? true : false} icon={{ name: 'business', cor: [ColorBase, style.color], size: '1.2rem', class: { width: '1.2rem', marginLeft: '1rem' } }}>Cidades</Botao>
                <Botao handleClick={() => {navegation('/pessoas'); setActive(false)}} select={path === '/pessoas' ? true : false} icon={{ name: 'user', cor: [ColorBase, style.color], size: '1.2rem', class: { width: '1.2rem', marginLeft: '1rem' } }}>Pessoas</Botao>
              </div>
              <div>
                <Botao handleClick={toggleTheme} icon={{ name: style.icon , cor: [ ColorBase , style.colorIcon ], size: '1.2rem', class: { width: '1.2rem', marginLeft: '1rem' } }}>Alternar Tema</Botao>
                <Botao handleClick={layout} icon={{ name: 'log-out', cor: [ColorBase, style.color], size: '1.2rem', class: { width: '1.2rem', marginLeft: '1rem' } }}>Logout</Botao>
              </div>
          </nav>
      </div>
      { (width <= 960) && <button onClick={() => setActive(!active)} className={`Mobile__Menu ${!active ? 'Menu' : 'Close'}`}></button>}
      </div>
      {children}
    </>
  )
}

export default MenuLateral;
