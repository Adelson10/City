import React from 'react';
import './Table.css';
import { BsPencil,BsTrash3,BsCaretLeftFill,BsCaretRightFill } from "react-icons/bs";
import { Environment } from '../../Environment';

const Table = ({body, head, ...props}) => {   
  if (body.length > 0) return (
    <>
    <table className='Table boxDateTitle'>
            <thead className="max_Width">
                <tr>
                    <th className='table__head'>Ações</th>
                    { head && head.map((labeHead) => {
                        const LabelHead = labeHead[0].toUpperCase() + labeHead.substring(1);
                    return <th className='table__head' key={labeHead}>{labeHead === 'nomeCompleto' ? 'Nome' : LabelHead}</th>
                    })}
                </tr>
            </thead>
            <tbody className="BoxDashBoard max_Width TableDesk">
            {body.map( ({id, data}) => {
                return <tr className='table__body' key={id}>
                        <td className='table__body_child'>
                            <div className='table__body_buttons'>
                                <button id={id} onClick={props.handleEdit}><BsPencil id={id}/></button>
                                <button id={id} onClick={props.handleDelete}><BsTrash3 id={id}/></button>
                            </div>
                        </td>
                        {data && data.map((value,index) => {
                            return <td className='table__body_child' key={index}>{value}</td>
                    })}</tr>
            })}
            <tr>
                <td>
                    <ul className='table_pages'>
                        {parseInt(props.searchParams.get('page')) > 1 && (
                        <li>
                            <button onClick={props.handlePrev} className='Prevs'><BsCaretLeftFill/></button>
                        </li>
                        )}
                        {parseInt(props.searchParams.get('page')) > Environment.LIMITE_DE_LINHAS && (
                        <>
                            <li>
                            <button className='pages_button' value={'1'} onClick={props.handleClick}>1</button>
                            </li>
                            <li>...</li>
                        </>
                        )}
                        {props.Pages.length > 0 && props.Pages.map((page) => (
                        <li key={page}>
                            <button className={`pages_button ${page === parseInt(props.searchParams.get('page')) ? 'Selecionado' : ''}`} value={page} onClick={props.handleClick}>{page}</button>
                        </li>
                        ))}
                        {parseInt(props.searchParams.get('page')) < (Math.ceil(props.totalCount / Environment.LIMITE_DE_LINHAS) - 1) && (
                        <>
                            <li>...</li>
                            <li>
                            <button className='pages_button' value={Math.ceil(props.totalCount / Environment.LIMITE_DE_LINHAS)} onClick={props.handleClick}>{Math.ceil(props.totalCount / Environment.LIMITE_DE_LINHAS)}</button>
                            </li>
                        </>
                        )}
                        {parseInt(props.searchParams.get('page')) < (Math.ceil(props.totalCount / Environment.LIMITE_DE_LINHAS)) && (
                        <li>
                            <button onClick={props.handleNext} className='Prevs'><BsCaretRightFill /></button>
                        </li>
                        )}
                    </ul>
                </td>
            </tr>
            </tbody>
        </table>
    </>
  );
  else return (<p>Nenhum registro encontrado.</p>);
}

export default Table;