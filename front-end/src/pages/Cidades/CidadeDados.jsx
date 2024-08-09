import React from 'react'
import { useParams } from 'react-router-dom';
import FormCidade from './components/FormCidades/FormCidade';
import WidthScreen from '../../shared/context/WidthScreen';
import { DownMotion, OpacityMotion } from '../../shared/Animations/DownMotion';

const CidadeDados = () => {
  const { id , detalhe } = useParams();
  document.title = detalhe;
  const { isMobile } = WidthScreen();
  
  return (
    <>
        <div className='Dashboard'>
          { !isMobile && 
            <OpacityMotion>
              <div className="perfil">
                <div className="foto"></div>
                <h2>Adelson Barros Dos Santos</h2>
              </div>
            </OpacityMotion>
          }
          <DownMotion width='100%' Animated={true}>
            <div className='BoxDashBoard max_Width TableDesk'>
              <div className='title' style={{textAlign: 'center'}}>
                <h1 style={{textAlign: 'center'}}>Cidade</h1>
                <p>{detalhe === 'adicionar' ? 'Cadastre sua cidade' : 'Editar Cidade'}</p>
              </div>
              <FormCidade id={id} detalhe={detalhe}></FormCidade>
            </div>
          </DownMotion>
        </div>
    </>
  )
}

export default CidadeDados;