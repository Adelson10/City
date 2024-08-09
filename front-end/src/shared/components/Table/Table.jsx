import React from 'react';
import './Table.css';
import { BsPencil,BsTrash3,BsCaretLeftFill,BsCaretRightFill } from "react-icons/bs";
import { Environment } from '../../Environment';
import { OpacityMotion } from '../../Animations/DownMotion';
import WidthScreen from '../../context/WidthScreen';

const TableBody = ({body, ...props}) => {   

  const { isMobile } = WidthScreen();

  if (body.length > 0) return (
    <>
        <OpacityMotion Box={true} tbody={true} isMobile={isMobile ? true : false}>
            {body.map( ({id, data}) => {
                return <tr className='table__body' style={{gridTemplateColumns: props.gridTemplateColumns}} key={id}>
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
            </OpacityMotion>
    </>
  );
  else return (<p>Nenhum registro encontrado.</p>);
}

export default TableBody;