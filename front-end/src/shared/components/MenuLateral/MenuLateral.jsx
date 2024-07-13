import React from 'react';
import Botao from '../Botao/Botao';
import HomeIcon from '../../../Icons/HomeIcon';
import CityIcon from '../../../Icons/CityIcon';
import UserIcon from '../../../Icons/UserIcon';

import './MenuLateral.css';
import Logo from '../../../Icons/LogoIcon';

const MenuLateral = () => {
  const [selectIcon, setSelectIcon] = React.useState(
    {
      Home: false,
      City: false,
      People: false
    }
  );

  function handleMouseEnter(event) {
    const id = event.target.id;
    setSelectIcon((icon) =>  {
      return{...icon, [id]: true};
    });
  }

  function handleMouseOver(event) {
    const id = event.target.id;
    setSelectIcon((icon) =>  {
      return{...icon, [id]: false};
    });
  }
  return (
    <article className='MenuLateral'>
        <div className='IconLogo'>
          <Logo fill='rgba(0,98,15,1)' size='8rem'></Logo>
        </div>
        <nav className='Nav__Botoes'>
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseOver}><Botao id='Home' icon={<HomeIcon cor={ selectIcon.Home ? 'white' : 'rgba(0,98,15,1)'} size='1.2rem' className='Button__Icons'/>}>Página inicial</Botao></div>
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseOver}><Botao id='City' icon={<CityIcon cor={ selectIcon.City ? 'white' : 'rgba(0,98,15,1)'} size='1.2rem' className='Button__Icons'/>}>Cidades</Botao></div>
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseOver}><Botao id='People' icon={<UserIcon cor={ selectIcon.People ? 'white' : 'rgba(0,98,15,1)'} size='1.2rem' className='Button__Icons'/>}>Pessoas</Botao></div>
        </nav>
    </article>
  )
}

export default MenuLateral;
