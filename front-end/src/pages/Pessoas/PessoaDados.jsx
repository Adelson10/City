import React from 'react'
import { useParams } from 'react-router-dom';
import './PessoasDados.css';
import FormPessoas from './components/FormPessoas/FormPessoas';
import WidthScreen from '../../shared/context/WidthScreen';

const PessoaDados = () => {
  const { id , detalhe } = useParams();
  document.title = detalhe;
  const { isMobile } = WidthScreen();


  return (
    <>
        <div className='Dashboard'>
          { !isMobile && 
            <div className="perfil">
              <div className="foto"></div>
              <h2>Adelson Barros Dos Santos</h2>
            </div>
          }
          <div className='BoxDashBoard max_Width TableDesk'>
            <div className='title' style={{textAlign: 'center'}}>
              <h1 style={{textAlign: 'center'}}>Pessoa</h1>
              <p>{detalhe === 'adicionar' ? 'Cadastre Pessoa' : 'Editar Pessoa'}</p>
            </div>
            <FormPessoas id={id} detalhe={detalhe}></FormPessoas>
          </div>
        </div>
    </>
  )
}

export default PessoaDados;