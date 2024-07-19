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
  const navigate = useNavigate();
  const [Body, setBody] = React.useState([]);
  const [Head, setHead] = React.useState([]);
  const [Pages, setPages] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  async function fetchData(pageAtual){
    try {
      const json = await pessoas.getAll('',pageAtual,1);
      const { body, head } = await filter.filterTable( json.json, ['nomeCompleto','cep']);
      setBody(body);
      setHead(head);
      const totalPages = Math.ceil( json.totalCount / Environment.LIMITE_DE_LINHAS);
      const pagesArray = PagesAtualizar(totalPages);
      setPages(pagesArray);
      setSearchParams({ page: pageAtual });
    } catch (error) {
      console.error('Erro no fetch: ', error);
    }
  }

  const PagesAtualizar = React.useCallback( (valor) => {
    let pagesArray = [];
    for (let index = 1; index <= valor; index++) {
      pagesArray.push(index);
    }
    return pagesArray;
  }, [])

  function handleClick(e) {
    const {value} = e.target;
    fetchData(value);
  }

  React.useEffect(() => {
    const currentPage = parseInt(searchParams.get('page')) || 1;
    fetchData(currentPage);
  }, [searchParams]);

  return (
    <div className='Dashboard'>
    <h1>Pessoas</h1>
        <div className='Container__Filtro'>
          <Button fontWeight='bold' width={10} onClick={() => navigate('/pessoas/adicionar')}>ADICIONAR</Button>
          <Filter placeholder='Buscar cidade'/>
        </div>
        {Body.length > 0 ? (
          <>
            <Table body={Body} head={Head} />
              <ul className='table_pages'>
                  {Pages.length > 0 && Pages.map((page) => (
                    <li key={page}>
                      <button className={`pages_button ${page === parseInt(searchParams.get('page')) ? 'Selecionado' : ''}`} value={page} onClick={handleClick}>{page}</button>
                    </li>
                  ))}
              </ul>
          </>
        ) : ( 
          <p>nenhuma pagina encontrada.</p>
         )}
  </div>
)
}

export default Pessoas;