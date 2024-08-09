import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Button from '../../shared/forms/Button';
import Filter from '../../shared/components/filter/Filter';
import TableBody from '../../shared/components/Table/Table';
import AlertBox from '../../shared/components/AlertBox/AlertBox';

import usePessoas from '../../shared/services/usePessoas';
import useFilterTable from '../../shared/Hooks/useFilterTable';
import { Environment } from '../../shared/Environment';

import './Pessoas.css';
import WidthScreen from '../../shared/context/WidthScreen';
import { motion } from 'framer-motion';

const Pessoas = () => {
  document.title = 'Pessoas';
  const pessoas = usePessoas();
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
    fetchData(currentPage, currentFilter);
  }, [setTotalCount]);

  useEffect(() => {
    fetchHead();
  }, []);

  async function fetchHead() {
    try {
      setCarregamento(true);
      const json = await pessoas.getAll('', 1, 1);
      const { head } = await filter.filterTable(json.json, ['nomeCompleto', 'cep']);
      setHead(['Ações', ...head]);
    } catch(error) {
      console.error('Erro no fetch: ', error);
    } finally {
      setCarregamento(false);
    }
  }

  async function fetchData(pageAtual, currentFilter) {
    try {
      setCarregamento(true);
      if(currentFilter===null) currentFilter = '';
      const json = await pessoas.getAll(currentFilter, pageAtual, 1);
      const { body } = await filter.filterTable(json.json, ['nomeCompleto', 'cep']);
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
        await fetchData(parseInt(searchParams.get('page')), '');
      } else {
        const filterValue = await pessoas.getAll(value);
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
    const { body } = await filter.filterTable(filterValue.json, ['nomeCompleto', 'cep']);
    const totalPages = Math.ceil(filterValue.totalCount / Environment.LIMITE_DE_LINHAS);
    const pagesArray = PagesAtualizar(totalPages);
    setBody(body);
    setPages(pagesArray);
    setCarregamento(false);
    setTotalCount(filterValue.totalCount);
  }, [PagesAtualizar]);


  function handleClick(e) {
    const { value } = e.target;
    fetchData(parseInt(value),searchParams.get('filter'));
  }

  function handleEdit(e) {
    const { id } = e.target;
    navigate(`/pessoas/editar/${id}`);
  }

  function handleDelete(e) {
    const { id } = e.target;
    setIdUser(id);
    setDelete(true);
  }

  function handleNo() {
    setDelete(false);
  }

  async function handleYes() {
    pessoas.DeleteById(idUser);
    setIdUser(null);
    setDelete(false);
    const currentPage = (totalCount - 1) % Environment.LIMITE_DE_LINHAS === 0 ?
      parseInt(searchParams.get('page')) - 1 :
      parseInt(searchParams.get('page'));
    fetchData(currentPage,searchParams.get('filter'));
  }

  async function handlePrev() {
    fetchData(parseInt(searchParams.get('page')) - 1,searchParams.get('filter'));
  }

  async function handleNext() {
    fetchData(parseInt(searchParams.get('page')) + 1,searchParams.get('filter'));
  }

  return (
    <div className='Dashboard'>
      {Delete &&
        <div className='fundo'>
          <AlertBox handleNo={handleNo} handleYes={handleYes}></AlertBox>
        </div>
      }
      <div className="BoxDashBoard max_Width">
        <div className="perfil">
          <div className="foto"></div>
          <h2>Adelson Barros Dos Santos</h2>
        </div>
        <div className="boxDateTitle">
          { !isMobile && 
            <div className='title'>
              <h1>Pessoas</h1>
              <p>Cadastrar Pessoas</p>
          </div>
          }
          <div className='Container__Filtro'>
            <Button fontWeight='400' onClick={() => navigate('/pessoas/adicionar')}>Adicionar</Button>
            <Filter handleChange={handleChange} change={valueSearch} placeholder='&#x1F50E;&#xFE0E; Buscar pessoas'/>
          </div>
        </div>
      </div>
      <table className='Table boxDateTitle'>
      <motion.thead
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.5, delay: 0.1}}
      className="max_Width">
                <tr style={{gridTemplateColumns: '1fr 2fr 2fr'}}>
                    { Head && Head.map((labeHead) => {
                        const LabelHead = labeHead[0].toUpperCase() + labeHead.substring(1);
                    return <th className='table__head' key={labeHead}>{labeHead === 'nomeCompleto' ? 'Nome' : LabelHead}</th>
                    })}
                </tr>
        </motion.thead>
        {carregamento ? (
        <tbody className='area_loader'></tbody>
        ) : Body.length > 0 ? (
        <>
          <TableBody body={Body} gridTemplateColumns={'1fr 2fr 2fr'} handleClick={handleClick} handleDelete={handleDelete} handleNext={handleNext} handlePrev={handlePrev} handleEdit={handleEdit} searchParams={searchParams} totalCount={totalCount} Pages={Pages}/>
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

export default Pessoas;