import React, { useState } from 'react';
import { BsFillHouseDoorFill,BsBuildings,BsFillPeopleFill,BsFillSunFill,BsFillMoonFill,BsBoxArrowLeft } from "react-icons/bs";
import Logo from '../../../Icons/LogoIcon';

import './MenuLateral.css';
import { useNavigate } from 'react-router-dom';
import { useDarkContext } from '../../Hooks/useDarkMode';
import { useAuthContext } from '../../context/AuthProvider';
import WidthScreen from '../../context/WidthScreen';
import { LeftMotion, UpMotionDelay,UpNavDelay } from '../../Animations/DownMotion';

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
      <LeftMotion isMobile={  isMobile ? true : false } delay={0.5}>
      <section className='Container_MenuLateral'>
        <div className='Menulateral max_Width'>
            <div className='Nav_Logo'>
                <Logo width='71px' height='46px'></Logo>
                <h1>City</h1>
            </div>
            <nav className='Nav__Pages'>
                  <UpNavDelay delay={1} isMobile={ isMobile ? true : false }><button className={path === '/dashboard' ? 'active' : ''} onClick={() => navegation('/dashboard')}>{isMobile && <div className='icon_Background'><BsFillHouseDoorFill /></div>}Dashboard</button></UpNavDelay>
                  <UpNavDelay delay={2} isMobile={ isMobile ? true : false }><button className={path === '/cidades' ? 'active' : ''} onClick={() => {navegation('/cidades');if(isMobile) document.querySelector('body').style.overflowY = 'scroll';}}>{isMobile && <div className='icon_Background'><BsBuildings /></div>}Cidades</button></UpNavDelay>
                  <UpNavDelay delay={3} isMobile={ isMobile ? true : false }><button className={path === '/pessoas' ? 'active' : ''} onClick={() => {navegation('/pessoas');if(isMobile) document.querySelector('body').style.overflowY = 'scroll';}}>{isMobile && <div className='icon_Background'><BsFillPeopleFill /></div>}Pessoas</button></UpNavDelay>
            </nav>
            <div className='Nav_Botoes'>
              <UpMotionDelay delay={1}><button className='Botao_Icon' onClick={layout}>{<BsBoxArrowLeft size={'1rem'}/>}</button></UpMotionDelay>
              <UpMotionDelay delay={2}><button className='Botao_Icon' onClick={handleClick}>{modeAtual==='light' ? <BsFillSunFill size={'1rem'}/> : <BsFillMoonFill size={'1rem'}/>}</button></UpMotionDelay>
            </div>
        </div>
      </section>
      </LeftMotion>
      {children}
    </>
  )
}

export default MenuLateral;
