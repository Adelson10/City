import React from 'react';
import './Table.css';
import 'boxicons';

const Table = ({body, head}) => {
  const [CorIcons, setCorIcons] = React.useState({
    delete: false,
    edit: false
  });
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
                        <button
                        className='Botão__Table'
                        onMouseOver={() => setCorIcons({...CorIcons, delete: true})}
                        onMouseOut={() => setCorIcons({...CorIcons, delete: false})}
                        >
                            </button>
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