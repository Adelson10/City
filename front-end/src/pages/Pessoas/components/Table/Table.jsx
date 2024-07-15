import React from 'react';
import './Table.css';
import 'boxicons';

const Table = ({body, head}) => {
  if (body) return (
    <table>
        <thead>
            <tr>
                <th>Ações</th>
                { head && head.map((labeHead) => {
                   return <th key={labeHead}>{labeHead === 'nomeCompleto' ? 'nome' : labeHead}</th>
                })}
            </tr>
        </thead>
        <tbody>
            {body && body.map( ({id, data}) => {
                return <tr key={id}>
                    <td>
                        <button className='Botão__Table'><box-icon type='solid' name='trash' size='1.5rem'></box-icon></button>
                        <button className='Botão__Table'><box-icon name='pencil' type='solid' size='1.5rem'></box-icon></button>
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