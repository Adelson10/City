import React from 'react';
import './Table.css';
import 'boxicons';
import BotaoIcon from '../Botao/BotaoIcon'
import { useDarkContext } from '../../Hooks/useDarkMode';
import { Environment } from '../../Environment';

const Table = ({body, head}) => {
  const {ColorBase, style} = useDarkContext();
  const [listPages, setListPages] = React.useState([]);

  async function handleEdit(e) {
    console.log(e.target);
  }
  
  async function handleDelete(e) {
    console.log(e.target);
  }

  React.useEffect(() => {
      const valor = async () => {
          const totalCount =  await body.totalCount;
          const valor = parseInt(totalCount/Environment.LIMITE_DE_LINHAS)+1;
          let newValue = [];
          for (let index = 0; index < valor; index++) {
             newValue.push(index);
          }
          setListPages(newValue);
      }
      valor();
  },[body.totalCount]);

  if (body.tabela) return (
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
                {body.tabela && body.tabela.map( ({id, data}) => {
                return <tr className='table__body' key={id}>
                        <td className='table__body_child'>
                            <div className='table__body_buttons'>
                                <BotaoIcon id={id} handleClick={handleEdit} icon={{ name: 'pencil', cor: [ColorBase, style.color], size: '1.2rem', class: { width: '1.2rem'} }}></BotaoIcon>
                                <BotaoIcon icon={{ name: 'trash-alt', cor: [ColorBase, style.color], size: '1.2rem', class: { width: '1.2rem'} }}></BotaoIcon>
                            </div>
                        </td>
                        {data && data.map((value,index) => {
                            return <td className='table__body_child' key={index}>{value}</td>
                    })}</tr>
                })}
            </tbody>
        </table>
        <ul className='table_pages'>
            {listPages && listPages.map((page) => (
              <li key={page}>{page}</li>
            ))}
        </ul>
    </>
  )
}

export default Table;