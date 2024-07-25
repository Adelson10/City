import React from 'react';
import './Dashboard.css';
import useCidade from '../../shared/services/useCidades';
import usePessoas from '../../shared/services/usePessoas';
import { Chart as ChartJS } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { useDarkContext } from '../../shared/Hooks/useDarkMode';

const Dashboard = () => {
  document.title = 'Pagina Inicial';

  const Cidades = useCidade();
  const Pessoas = usePessoas();
  const {ColorBase} = useDarkContext();

  const [cidades, setCidades] = React.useState([{quantidade: 0, label: 'Cidades cadastradas'},{quantidade: 5565, label: 'Total de Cidades'}]);
  const [pessoas, setPessoas] = React.useState([{quantidade: 0, label: 'Pessoas cadastradas'},{quantidade: 203100000, label: 'Total de Pessoas'}]);

  React.useEffect( () => {
    Cidades.getAll().then((response) => response.totalCount).then((totalCount) => setCidades((values) => values.map((value, index) => {if(index===0) return {...value, quantidade: totalCount}; else return{...value};})));
    Pessoas.getAll().then((response) => response.totalCount).then((totalCount) => setPessoas((values) => values.map((value, index) => {if(index===0) return {...value, quantidade: totalCount}; else return{...value};})));
  }, []);

  return (
    <div className='Dashboard'>
      <h1>DASHBOARD</h1>
      <div className='Container__Total'>
          <div>
              <h3>Total de Cidades Cadastradas</h3>
              <div className='Grafico'>
                <Doughnut data={{
                    labels: cidades.map((labels) => labels.label),
                    datasets: [{
                      label: 'Cidades',
                      data: cidades.map((quantidade) => quantidade.quantidade),
                      backgroundColor: [
                        ColorBase,
                        'white',
                      ],
                      borderRadius: 5
                    }]
                  }} />
                  <h1>{cidades[0].quantidade}<p>Total</p></h1>
              </div>
          </div>
          <div>
              <h3>Total de Pessoas</h3>
              <div className='Grafico'>
              <Doughnut data={{
                  labels: pessoas.map((labels) => labels.label),
                  datasets: [{
                    label: 'Pessoas',
                    data: pessoas.map((quantidade) => quantidade.quantidade),
                    backgroundColor: [
                      ColorBase,
                      'white',
                    ],
                    borderRadius: 5,
                  }]
                }} />
                <h1>{pessoas[0].quantidade}<p>Total</p></h1>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Dashboard;