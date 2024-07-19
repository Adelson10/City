import React from "react";
import { Environment } from "../Environment"; 
import { useAuthContext } from "../context/AuthProvider";
import useCidade from "./useCidades";
const usePessoas = () => {
  
  const { isAuthenticated } = useAuthContext();
  const cidade = useCidade();
  const getAll =  React.useCallback( async ( filter = '',page = 1, id = 1) => {
    try {
      if (isAuthenticated) { 
        
        const response = await fetch(`https://estudos-nodejs-2.onrender.com/pessoas?page=${page}&limit=${Environment.LIMITE_DE_LINHAS}&filter=${filter}&id=${id}`, {
        headers: {
          'authorization' : `Bearer ${localStorage.getItem('APP_ACCESS_TOKEN').replace(/["]/g, '')}`
        }
      });
      const json = await response.json();
-      console.log(response.headers.get('X-Total-Count'));
      if(response.status !== 200) {
        throw new Error('Problema com a consulta.');
      }else {
          return {
            json,
            totalCount: Number(response.headers.get('X-Total-Count') || Environment.LIMITE_DE_LINHAS)
          }
      }

      return new Error('Erro ao listar regristros.');
    }
    } catch (error) {
      console.log(error);
      return new Error(error.message || 'Erro ao listar os registros.');
    }
  }, []);

  const getById =  React.useCallback( async (id = 1) => {
    try {
      if (isAuthenticated) { 
        
        const response = await fetch(`https://estudos-nodejs-2.onrender.com/pessoas/${id}`, {
        headers: {
          'authorization' : `Bearer ${localStorage.getItem('APP_ACCESS_TOKEN').replace(/["]/g, '')}`
        },
        body: JSON.stringify()
      });
      const json = await response.json();
      if(response.ok!==true) {
        if (json) {
          return json;
        } else return;
      }

      return new Error('Erro ao listar regristros.')
    }
    } catch (error) {
      console.log(error);
      return new Error(error.message || 'Erro ao listar os registros.');
    }
  }, []);

  const create =  React.useCallback( async (form) => {
    const result = await cidade.getAll(form.cidadeId,1,0);
    const json = await result.json;
    form['cidadeId'] = json[0].id;
    try {
      if (isAuthenticated) { 
        
        const response = await fetch(`https://estudos-nodejs-2.onrender.com/pessoas`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          'authorization' : `Bearer ${localStorage.getItem('APP_ACCESS_TOKEN').replace(/["]/g, '')}`
        },
        body: JSON.stringify(form)
      });
      const json = await response.json();
      if(response.ok===false) {
        if(response.status === 500 && typeof json != 'number') {
            throw new Error('Usuario já cadastrado');
        }
      }else {
        if(typeof json === 'number') {
            return json;
        }
      }
        return new Error('Erro ao criar regristros.')
    }
    } catch (error) {
      throw new Error(error.message || 'Erro ao listar os registros.');
    }
  }, []);

  const DeleteById =  React.useCallback( async (id) => {
    try {
      if (isAuthenticated) { 
        
        const response = await fetch(`https://estudos-nodejs-2.onrender.com/pessoas/${id}`, {
        method: 'DELETE',
        headers: {
          'authorization' : `Bearer ${localStorage.getItem('APP_ACCESS_TOKEN').replace(/["]/g, '')}`
        }
      });
      const json = await response.json();

      if(response.ok!==false) {
        if (json) {
          return json;
        } else return 'Deletado com sucesso.';
      }else return new Error('Erro ao listar regristros.');
    }
    } catch (error) {
      console.log(error);
      return new Error(error.message || 'Erro ao listar os registros.');
    }
  }, []);

  const UpdateById =  React.useCallback( async (form, id) => {
    try {
      if (isAuthenticated) { 
        
        const response = await fetch(`https://estudos-nodejs-2.onrender.com/pessoas/${id}`, {
        method: 'PUT',
        headers: {
          'authorization' : `Bearer ${localStorage.getItem('APP_ACCESS_TOKEN').replace(/["]/g, '')}`
        },
        body: JSON.stringify(form)
      });
      const json = await response.json();
      
      if(response.ok!==false) {
        if (json) {
          return json;
        } else return 'Atualizado com sucesso.';
      }else return new Error('Erro ao listar regristros.');
    }
    } catch (error) {
      console.log(error);
      return new Error(error.message || 'Erro ao listar os registros.');
    }
  }, []);

  return {
      getAll,
      create,
      DeleteById,
      UpdateById,
      getById
  }
  
}

export default usePessoas;