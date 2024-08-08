import React, { useState } from 'react';
import './Dashboard.css';
import useCidade from '../../shared/services/useCidades';
import usePessoas from '../../shared/services/usePessoas';
import { Chart as ChartJS } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import BoxDashboard from '../../shared/components/BoxDashboard/BoxDashboard';
import { BsBuildings,BsFillPeopleFill } from "react-icons/bs";
import { motion } from 'framer-motion';
import { useDarkContext } from '../../shared/Hooks/useDarkMode';

const Dashboard = () => {
  document.title = 'Pagina Inicial';
  const [nomeUsuario, setNomeUsuario] = useState('');

  const Cidades = useCidade();
  const Pessoas = usePessoas();
  const [graficoSelecionado, setGraficoSelecionado] = useState('cidades');

  const [cidades, setCidades] = React.useState([{quantidade: 0, label: 'Cidades cadastradas'},{quantidade: 5565, label: 'Total de Cidades'}]);
  const [pessoas, setPessoas] = React.useState([{quantidade: 0, label: 'Pessoas cadastradas'},{quantidade: 203100000, label: 'Total de Pessoas'}]);

  React.useEffect( () => {
    Cidades.getAll().then((response) => response.totalCount).then((totalCount) => setCidades((values) => values.map((value, index) => {if(index===0) return {...value, quantidade: totalCount}; else return{...value};})));
    Pessoas.getAll().then((response) => response.totalCount).then((totalCount) => setPessoas((values) => values.map((value, index) => {if(index===0) return {...value, quantidade: totalCount}; else return{...value};})));
    
  }, []);

  function handleClick(e) {
    const value = e.target.value;
    setGraficoSelecionado(value);
    const grafico = document.querySelector('div.Grafico');
    const containerGrafico = document.querySelector('div.Grafico_Container');    
    containerGrafico.style.transform = `translateX(-${grafico.clientWidth*Number(e.target.id)}px`;
  }
  
  const { modeAtual } = useDarkContext();

  return (
    <div className='Dashboard'>
      <div className="BoxDashBoard max_Width">
      <div className="perfil">
        <div className="foto"></div>
        <h2>Adelson Barros Dos Santos</h2>
      </div>
        <div className='title'>
          <h1>Dashboard</h1>
          <p>Home / Dashboard</p>
        </div>
        <div className='Box_Total'>
          <div className="containers_total">
            <BoxDashboard nome='Cidades' icon={<BsBuildings fontSize='3.5rem'/>} total={cidades[0].quantidade}/>
          </div>
          <div className="containers_total">
            <BoxDashboard nome='Pessoas' icon={<BsFillPeopleFill fontSize='3.5rem'/>} total={pessoas[0].quantidade}/>
          </div>
        </div>
      </div>
      <div className='Container_Graficos max_Width'>
            <div className='title'>
              <h1>Cidades</h1>
              <p>Total de Cidades Cadastradas</p>
            </div>
            <div className="container_GraficoSelect">
              <div className="Grafico_Select">
                <motion.div className={`switch ${graficoSelecionado}`}/>
                <button onClick={handleClick} className={graficoSelecionado==='cidades' ? 'on' : 'off'} value='cidades' id='0'>Cidades</button>
                <button onClick={handleClick} className={graficoSelecionado==='pessoas' ? 'on' : 'off'} value='pessoas' id='1'>Pessoas</button>
              </div>
            </div>
            <div className="Grafico">
              <div className="Grafico_Container">
                  <Doughnut data={{
                        labels: cidades.map((labels) => labels.label),
                        datasets: [{
                          label: 'Cidades',
                          data: cidades.map((quantidade) => quantidade.quantidade),
                          backgroundColor: [
                            `${modeAtual && getComputedStyle(document.body).getPropertyValue('--brand')}`,
                            `${modeAtual && getComputedStyle(document.body).getPropertyValue('--bg_light')}`,
                          ],
                          borderRadius: 5
                }]
                }} />
                <Doughnut data={{
                        labels: pessoas.map((labels) => labels.label),
                        datasets: [{
                          label: 'Pessoas',
                          data: pessoas.map((quantidade) => quantidade.quantidade),
                          backgroundColor: [
                            `${modeAtual && getComputedStyle(document.body).getPropertyValue('--brand')}`,
                            `${modeAtual && getComputedStyle(document.body).getPropertyValue('--bg_light')}`,
                          ],
                          borderRadius: 5
                }]
                }} />
              </div>
            </div>
      </div>
      </div>
  )
}

export default Dashboard;