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
  const { modeAtual } = useDarkContext();

  function handleClick() {
    toggleTheme();
  }
  
  return (
    <>
      <section className='Container_MenuLateral'>
      <div className='Menulateral max_Width'>
          <div className='Nav_Logo'>
              <Logo width='71px' height='46px'></Logo>
              <h1>City</h1>
          </div>
          <nav className='Nav__Pages'>
                <button className={path === '/dashboard' ? 'active' : ''} onClick={() => navegation('/dashboard')}>{isMobile && <div className='icon_Background'><BsFillHouseDoorFill /></div>}Dashboard</button>
                <button className={path === '/cidades' ? 'active' : ''} onClick={() => navegation('/cidades')}>{isMobile && <div className='icon_Background'><BsBuildings /></div>}Cidades</button>
                <button className={path === '/pessoas' ? 'active' : ''} onClick={() => navegation('/pessoas')}>{isMobile && <div className='icon_Background'><BsFillPeopleFill /></div>}Pessoas</button>
          </nav>
          <div className='Nav_Botoes'>
              <button className='Botao_Icon' onClick={handleClick}>{modeAtual==='light' ? <BsFillSunFill size={'1rem'}/> : <BsFillMoonFill size={'1rem'}/>}</button>
              <button className='Botao_Icon' onClick={layout}>{<BsBoxArrowLeft size={'1rem'}/>}</button>
          </div>
      </div>
      </section>
      {children}
    </>
  )
}

export default MenuLateral;
