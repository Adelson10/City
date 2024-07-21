import React from 'react';
import './Table.css';
import 'boxicons';
import BotaoIcon from '../Botao/BotaoIcon'
import { useDarkContext } from '../../Hooks/useDarkMode';

const Table = ({body, head, ...props}) => {

  const {ColorBase, style} = useDarkContext();

  if (body.length > 0) return (
    <>
        <table className='Table'>
            <thead>
                <tr>
                    <th className='table__head'>Ações</th>
                    { head && head.map((labeHead) => {
                        const LabelHead = labeHead[0].toUpperCase() + labeHead.substring(1);
                    return <th className='table__head' key={labeHead}>{labeHead === 'nomeCompleto' ? 'Nome' : LabelHead}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {body.map( ({id, data}) => {
                return <tr className='table__body' key={id}>
                        <td className='table__body_child'>
                            <div className='table__body_buttons'>
                                <BotaoIcon id={id} handleClick={props.handleEdit} icon={{ name: 'pencil', cor: [ColorBase, style.color], size: '1.2rem', class: { width: '1.2rem'} }}></BotaoIcon>
                                <BotaoIcon id={id} handleClick={props.handleDelete} icon={{ name: 'trash-alt', cor: [ColorBase, style.color], size: '1.2rem', class: { width: '1.2rem'} }}></BotaoIcon>
                            </div>
                        </td>
                        {data && data.map((value,index) => {
                            return <td className='table__body_child' key={index}>{value}</td>
                    })}</tr>
                })}
            </tbody>
        </table>
    </>
  );
  else return (<p>Nenhum registro encontrado.</p>);
}

export default Table;