import React, { useState } from 'react';
import { BsFillHouseDoorFill,BsBuildings,BsFillPeopleFill,BsFillSunFill,BsFillMoonFill,BsBoxArrowLeft } from "react-icons/bs";
import Logo from '../../../Icons/LogoIcon';

import './MenuLateral.css';
import { useNavigate } from 'react-router-dom';
import { useDarkContext } from '../../Hooks/useDarkMode';
import { useAuthContext } from '../../context/AuthProvider';
import WidthScreen from '../../context/WidthScreen';

const MenuLateral = ({children}) => {
  const path = window.location.pathname;
  const navegation = useNavigate();
  const { layout } = useAuthContext();
  const { isMobile } = WidthScreen();
  const {  toggleTheme } = useDarkContext();
  const [check,SetCheck] = useState(localStorage.getItem('APP_DARK_MODE'));

  const [active, setActive] = React.useState(false);

  function handleClick() {
    toggleTheme();
    SetCheck(document.querySelector('body').getAttribute('data-theme'));
  }

  return (
    <>
      <section className='Container_MenuLateral'>
      <div className='Menulateral'>
          <div className='Nav_Logo'>
              <Logo width='71px' height='46px'></Logo>
              <h1>City</h1>
          </div>
          <nav className='Nav__Pages'>
                <button onClick={() => {navegation('/pagina-inicial'); setActive(false);}} select={path === '/pagina-inicial' ? true : false}>{isMobile && <div className='icon_Background'><BsFillHouseDoorFill /></div>}Dashboard</button>
                <button onClick={() =>{ navegation('/cidades'); setActive(false);}} select={path === '/cidades' ? true : false}><div className='icon_Background'>{isMobile && <BsBuildings />}</div>Cidades</button>
                <button onClick={() => {navegation('/pessoas'); setActive(false)}} select={path === '/pessoas' ? true : false}><div className='icon_Background'>{isMobile && <BsFillPeopleFill />}</div>Pessoas</button>
          </nav>
          <div className='Nav_Botoes'>
              <button className='Botao_Icon' onClick={handleClick}>{check==='light' ? <BsFillSunFill size={'1rem'}/> : <BsFillMoonFill size={'1rem'}/>}</button>
              <button className='Botao_Icon' onClick={layout}>{<BsBoxArrowLeft size={'1rem'}/>}</button>
          </div>
      </div>
      </section>
      {children}
    </>
  )
}

export default MenuLateral;
