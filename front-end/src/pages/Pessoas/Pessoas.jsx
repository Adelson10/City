import React from 'react';
import Button from '../../shared/forms/Button';
import Filter from './components/filter/Filter';
import Table from '../../shared/components/Table/Table';

import './Pessoas.css';
import usePessoas from '../../shared/services/usePessoas';
import useFilterTable from '../../shared/Hooks/useFilterTable';
import { useNavigate } from 'react-router-dom';

const Pessoas = () => {
  
  const pessoas = usePessoas();
  const filter = useFilterTable();
  const [Body, setBody] = React.useState();
  const [Head, setHead] = React.useState();
  const navigate = useNavigate();
  
  React.useState(() => {
    pessoas.getAll().then((response) => response.json).then((json) => {
        const { body, head } = filter.filterTable(json, ['nomeCompleto','cep']);
        setBody(body);
        setHead(head);
        
    });
  }, []);
  return (
    <div className='Dashboard'>
    <h1>Pessoas</h1>
        <div className='Container__Filtro'>
          <Button fontWeight='bold' width={10} onClick={() => navigate('/pessoas/adicionar')}>ADICIONAR</Button>
          <Filter placeholder='Buscar cidade'/>
        </div>
        <Table body={Body} head={Head} />
  </div>
)
}

export default Pessoas;