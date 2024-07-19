import React from 'react';
import Button from '../../shared/forms/Button';
import Filter from './components/filter/Filter';
import Table from '../../shared/components/Table/Table';

import './Pessoas.css';
import usePessoas from '../../shared/services/usePessoas';
import useFilterTable from '../../shared/Hooks/useFilterTable';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Environment } from '../../shared/Environment';

const Pessoas = () => {
  
  const pessoas = usePessoas();
  const filter = useFilterTable();
  const [Body, setBody] = React.useState({});
  const [Head, setHead] = React.useState();
  const [Pages, setPages] = React.useState(1);
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    data(Pages);
  }, []);

  async function data(pageAtual){
    const json = await pessoas.getAll('',pageAtual,1);
    const { body, head } = await filter.filterTable(json.json, ['nomeCompleto','cep']);
    setBody(body);
    setHead(head);
    const valor = parseInt(json.totalCount/Environment.LIMITE_DE_LINHAS)+1;
    const valorAtualizado = PagesAtualizar(valor);
    setPages(valorAtualizado);
  }

  const PagesAtualizar = React.useCallback( (valor) => {
    let newValue = [];
    for (let index = 1; index <= valor; index++) {
      newValue.push(index);
    }
    return newValue;
  })

  function handleClick(e) {
    const {value} = e.target;
    data(value);
  }

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  return (
    <div className='Dashboard'>
    <h1>Pessoas</h1>
        <div className='Container__Filtro'>
          <Button fontWeight='bold' width={10} onClick={() => navigate('/pessoas/adicionar')}>ADICIONAR</Button>
          <Filter placeholder='Buscar cidade'/>
        </div>
        {Body.length > 0 && <Table body={Body} head={Head} />}
        <ul className='table_pages'>
            {Pages.length > 0 && Pages.map((page) => (
              <li key={page}><button className={`pages_button ${page === Pages ? 'Selecionado' : ''}`} value={page} onClick={handleClick}>{page}</button></li>
            ))}
        </ul>
  </div>
)
}

export default Pessoas;