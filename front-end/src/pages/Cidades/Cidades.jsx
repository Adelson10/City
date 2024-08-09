import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../shared/forms/Button';
import Filter from '../../shared/components/filter/Filter';
import Table from '../../shared/components/Table/Table';
import AlertBox from '../../shared/components/AlertBox/AlertBox';
import { Environment } from '../../shared/Environment';
import useCidades from '../../shared/services/useCidades';
import useFilterTable from '../../shared/Hooks/useFilterTable';
import WidthScreen from '../../shared/context/WidthScreen';
import { OpacityMotion } from '../../shared/Animations/DownMotion';
import { motion } from 'framer-motion';
 
const Cidades = () => {
  document.title = 'Cidades';
  const cidades = useCidades();
  const filter = useFilterTable();
  const navigate = useNavigate();
  const [Body, setBody] = useState([]);
  const [Head, setHead] = useState([]);
  const [Pages, setPages] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const [carregamento, setCarregamento] = useState(null);
  const [Delete, setDelete] = useState(false);
  const [idUser, setIdUser] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams('');
  const [valueSearch, setValueSearch] = useState('');
  const { isMobile } = WidthScreen();

  useEffect(() => {
    const currentPage = parseInt(searchParams.get('page')) || 1;
    const currentFilter = searchParams.get('filter') || '';
    fetchData(currentPage,currentFilter);
  }, [setTotalCount]);

  useEffect(() => {
    fetchHead();
  }, [])

  async function fetchHead() {
    try {
      setCarregamento(true);
      const json = await cidades.getAll('', 1, 1);
      const { head } = await filter.filterTable(json.json, ['nome']);
      setHead(['Ações', ...head]);
    } catch(error) {
      console.error('Erro no fetch: ', error);
    } finally {
      setCarregamento(false);
    }
  }

  async function fetchData(pageAtual, currentFilter = '') {
    try {
      setCarregamento(true);
      if(currentFilter===null) currentFilter = '';
      const json = await cidades.getAll(currentFilter, pageAtual, 1);
      const { body } = await filter.filterTable(json.json, ['nome']);
      const totalPages = Math.ceil(json.totalCount / Environment.LIMITE_DE_LINHAS);
      const pagesArray = PagesAtualizar(totalPages, pageAtual);
      setValueSearch(currentFilter);
      setBody(body);
      setPages(pagesArray);
      setSearchParams({ page: pageAtual || 1, filter: currentFilter });
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
        setSearchParams({ page: 1, filter: '' });
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

  const PagesAtualizar = useCallback((totalPages, paginaAtual = 1) => {
    let pagesArray = [];
    let novoArray = [];

    for (let i = 1; i <= totalPages; i++) {
      pagesArray.push(i);
    }
    for (let i = 0; i <= pagesArray.length; i = i + Environment.LIMITE_DE_LINHAS) {
      novoArray.push(pagesArray.slice(i, i + Environment.LIMITE_DE_LINHAS));
    }
    const ArrayVerificado = novoArray.filter((v) => {
      if (v.includes(paginaAtual)) return v;
    });
    return ArrayVerificado[0];
  }, []);

  const CallFilter = useCallback(async (filterValue) => {
    const { body } = await filter.filterTable(filterValue.json, ['nome']);
    const totalPages = Math.ceil(filterValue.totalCount / Environment.LIMITE_DE_LINHAS);
    const pagesArray = PagesAtualizar(totalPages);
    setBody(body);
    setPages(pagesArray);
    setTotalCount(filterValue.totalCount);
    setCarregamento(false);
  }, [setBody]);

  function handleClick(e) {
    const { value } = e.target;
    fetchData(parseInt(value), searchParams.get('filter'));
  }

  function handleEdit(e) {    
    const id = e.target.id;
    
    navigate(`/cidades/editar/${id}`);
  }

  async function handleDelete(e) {
    const { id } = e.target;
    document.querySelector('body').style.overflowY = 'hidden';
    setIdUser(id);
    setDelete(true);
  }

  function handleNo() {
    document.querySelector('body').style.overflowY = 'scroll';
    setDelete(false);
  }

  function handleYes() {
    cidades.DeleteById(idUser);
    setIdUser(null);
    setDelete(false);
    let currentPage = null;
    if ((totalCount - 1) % Environment.LIMITE_DE_LINHAS === 0) {
      currentPage = parseInt(searchParams.get('page')) - 1;
    } else {
      currentPage = parseInt(searchParams.get('page'));
    }
    setTimeout(() => fetchData(currentPage, searchParams.get('filter')), )
  }

  function handlePrev() {
    fetchData(parseInt(searchParams.get('page')) - 1, searchParams.get('filter'));
  }

  function handleNext() {
    fetchData(parseInt(searchParams.get('page')) + 1, searchParams.get('filter'));
  }

  return (
    <div className='Dashboard'>
      { Delete && 
      <div className='fundo'>
          <AlertBox handleNo={handleNo} handleYes={handleYes}></AlertBox>
      </div>
      }
      <OpacityMotion isMobile={ isMobile ? true : false } Box={true}>
        <div className="BoxDashBoard max_Width">
          <div className="perfil">
            <div className="foto"></div>
            <h2>Adelson Barros Dos Santos</h2>
          </div>
          <div className="boxDateTitle">
            { !isMobile && 
              <div className='title'>
                <h1>Cidades</h1>
                <p>Cadastro suas cidades</p>
            </div>
            }
            <div className='Container__Filtro'>
              <Button fontWeight='400' onClick={() => navigate('/cidades/adicionar')}>Adicionar</Button>
              <Filter handleChange={handleChange} change={valueSearch} placeholder='&#x1F50E;&#xFE0E; Buscar cidades'/>
            </div>
          </div>
          </div>
        </OpacityMotion>
        <table className='Table boxDateTitle'>
            <motion.thead
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5, delay: 0.1}}
            className="max_Width">
                <tr style={{gridTemplateColumns: '1fr 2fr'}}>
                    { Head && Head.map((labeHead) => {
                        const LabelHead = labeHead[0].toUpperCase() + labeHead.substring(1);
                    return <th className='table__head' key={labeHead}>{labeHead === 'nomeCompleto' ? 'Nome' : LabelHead}</th>
                    })}
                </tr>
            </motion.thead>
        {carregamento ? (
        <tbody className='area_loader'></tbody>
        ) : (Body.length > 0) ? (
        <>
        <Table gridTemplateColumns={'1fr 2fr'} body={Body} head={Head} handleClick={handleClick} handleDelete={handleDelete} handleNext={handleNext} handlePrev={handlePrev} handleEdit={handleEdit} searchParams={searchParams} totalCount={totalCount} Pages={Pages}/>
        </>
      ) : (
        <tbody className='BoxDashBoard max_Width'>
          <tr><td>Nenhum registro encontrado.</td></tr>
        </tbody>
      )}
      </table>
    </div>
  );
}

export default Cidades;