import React from 'react';
import Button from '../../shared/forms/Button';
import Filter from '../../shared/components/filter/Filter';
import Table from '../../shared/components/Table/Table';

import useFilterTable from '../../shared/Hooks/useFilterTable';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Environment } from '../../shared/Environment';
import AlertBox from '../../shared/components/AlertBox/AlertBox';
import useCidade from '../../shared/services/useCidades';

const Cidades = () => {
  
  const cidades = useCidade();
  const filter = useFilterTable();
  const navigate = useNavigate();
  const [Body, setBody] = React.useState([]);
  const [Head, setHead] = React.useState([]);
  const [Pages, setPages] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState();
  const [carregamento, setCarregamento] = React.useState(null);
  const [Delete, setDelete] = React.useState(false);
  const [idUser, setIdUser] = React.useState(null);
  const [searchParams, setSearchParams] = useSearchParams('');
  const [valueSearch, setValueSearch] = React.useState('');

  async function fetchData(pageAtual){
    try {
      setCarregamento(true);
      const json = await cidades.getAll('', pageAtual, 1);
      const { body, head } = await filter.filterTable(json.json, ['nome']);
      const totalPages = Math.ceil(json.totalCount / Environment.LIMITE_DE_LINHAS);
      const pagesArray = PagesAtualizar(totalPages);
      if (searchParams.get('filter')) {
        const filter = searchParams.get('filter');
        setValueSearch(filter);
        const filterValue = await cidades.getAll(valueSearch);
        CallFilter(filterValue);
        setSearchParams({ page: pageAtual || 1, filter });
      } else {
        setBody(body);
        setHead(head);
        setPages(pagesArray);
        setSearchParams({ page: pageAtual });
      }
  
      setTotalCount(json.totalCount);
    } catch (error) {
      console.error('Erro no fetch: ', error);
    } finally {
      setCarregamento(false);
    }
  }

  async function handleChange(e) {
    const { value } = e.target;
    setValueSearch(value);
  
    try {
      setCarregamento(true);
  
      if (value.length === 0) {
        searchParams.set('filter', '')
        await fetchData(1);
        setSearchParams({ page: 1 });
      } else {
        const filterValue = await cidades.getAll(value);
        CallFilter(filterValue);
        setSearchParams({ page: 1, filter: value });
      }
    } catch (error) {
      console.error('Erro no handleChange: ', error);
    } finally {
      setCarregamento(false);
    }
  }

  const PagesAtualizar = React.useCallback( (valor) => {
    let pagesArray = [];
    for (let index = 1; index <= valor; index++) {
      pagesArray.push(index);
    }
    return pagesArray;
  }, []);

  const CallFilter = React.useCallback( async (filterValue) => {
        const { body } = await filter.filterTable( filterValue.json, ['nome'] );
        const totalPages = Math.ceil( filterValue.totalCount / Environment.LIMITE_DE_LINHAS );
        const pagesArray = PagesAtualizar(totalPages);
        setBody(body);
        setPages(pagesArray);
        setCarregamento(false);
        setTotalCount(filterValue.totalCount);
  });

  function handleClick(e) {
    const {value} = e.target;
    fetchData(value);
  }

  function handleEdit(e) {
    const { id } = e.target;
    navigate(`/cidades/editar/${id}`);
  }

  async function handleDelete(e) {
    const { id } = e.target;
    setTimeout(() => {
      setIdUser(id);
      setDelete(true);
    }, 1000);
  }

  function handleNo() {
    setDelete(false);
  }

  function handleYes() {
    cidades.DeleteById(idUser);
    setIdUser(null);
    setDelete(false);
    let currentPage = null;
    if ((totalCount-1) % Environment.LIMITE_DE_LINHAS === 0) {
      currentPage = parseInt(searchParams.get('page')) - 1;
    } else {
      currentPage = parseInt(searchParams.get('page'));
    }
    fetchData(currentPage);
  }

  React.useEffect(() => {
    const currentPage = parseInt(searchParams.get('page')) || 1;
    fetchData(currentPage);
  }, [setPages]);

  return (
    <div className='Dashboard'>
    {Delete && 
    <div className='fundo'>
        <AlertBox handleNo={handleNo} handleYes={handleYes}></AlertBox>
    </div>}
    <h1>Cidades</h1>
        <div className='Container__Filtro'>
          <Button fontWeight='bold' width={10} onClick={() => navigate('/cidades/adicionar')}>ADICIONAR</Button>
          <Filter handleChange={handleChange} change={valueSearch} placeholder='Buscar cidades'/>
        </div>
        { carregamento ? (
          <div className='area_loader'>
              <div className='loader'></div>
          </div>
        ) :  Body.length > 0 ? 
        (<>
          <Table body={Body} head={Head} handleDelete={handleDelete} handleEdit={handleEdit}/>
            <ul className='table_pages'>
                {Pages.length > 0 && Pages.map((page) => (
                  <li key={page}>
                    <button className={`pages_button ${page === parseInt(searchParams.get('page')) ? 'Selecionado' : ''}`} value={page} onClick={handleClick}>{page}</button>
                  </li>
                ))}
            </ul>
        </> ): (
        <div>
          <p>Nenhum registro encontrado.</p>
         </div>
        )}
  </div>
)
}

export default Cidades;