import React from 'react';
import Botao from '../Botao';

const MenuLateral = () => {
  return (
    <article>
        <div className='IconLogo'></div>
        <nav>
            <Botao>Página inicial</Botao>
            <Botao>Cidades</Botao>
            <Botao>Pessoas</Botao>
        </nav>
    </article>
  )
}

export default MenuLateral;
