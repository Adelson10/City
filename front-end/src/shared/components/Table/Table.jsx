import React from 'react';
import './Table.css';
import 'boxicons';
import BotaoIcon from '../Botao/BotaoIcon'
import { useDarkContext } from '../../Hooks/useDarkMode';

const Table = ({body, head}) => {

  const {ColorBase, style} = useDarkContext();

  if (body) return (
    <table className='Table'>
        <thead>
            <tr>
                <th className='table__head' colSpan='1'>Ações</th>
                { head && head.map((labeHead) => {
                    const LabelHead = labeHead[0].toUpperCase() + labeHead.substring(1);
                   return <th className='table__head' key={labeHead}>{labeHead === 'nomeCompleto' ? 'Nome' : LabelHead}</th>
                })}
            </tr>
        </thead>
        <tbody>
            {body && body.map( ({id, data}) => {
                return <tr className='table__body' key={id}>
                    <td className='table__body'>
                        <BotaoIcon icon={{ name: 'pencil', cor: [ColorBase, style.color], size: '1.2rem', class: { width: '1.2rem', marginLeft: '1rem' } }}></BotaoIcon>
                        <BotaoIcon icon={{ name: 'trash-alt', cor: [ColorBase, style.color], size: '1.2rem', class: { width: '1.2rem', marginLeft: '1rem' } }}></BotaoIcon>
                    </td>
                    {data && data.map((value,index) => {
                        return <td key={index}>{value}</td>
                })}</tr>
            })}
        </tbody>
    </table>
  )
}

export default Table;