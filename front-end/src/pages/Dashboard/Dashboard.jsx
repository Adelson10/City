import React from 'react';
import './Dashboard.css';
import useCidade from '../../shared/services/useCidade';

const Dashboard = () => {
  const { getAll } = useCidade();
  
  React.useEffect( () => {
    getAll();
  }, [getAll]);
  
  return (
    <div className='Dashboard'>
      <h1>DASHBOARD</h1>
      <div>
          <div>
              <h3>Total de Pessoas</h3>
              <h1></h1>
          </div>
      </div>
    </div>
  )
}

export default Dashboard;