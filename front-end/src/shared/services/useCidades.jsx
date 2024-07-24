import React from "react";
import { Environment } from "../Environment"; 
import { useAuthContext } from "../context/AuthProvider";

const useCidade = () => {
  
  const { isAuthenticated } = useAuthContext();

  const getAll =  React.useCallback( async (filter = '', page = 1 , id = 1) => {
    try {
      if (isAuthenticated) { 
        let response = undefined;
        if(id > 0) {
          response = await fetch(`https://estudos-nodejs-2.onrender.com/cidades?page=${page}&limit=${Environment.LIMITE_DE_LINHAS}&filter=${filter}`, {
            headers: {
              'authorization' : `Bearer ${localStorage.getItem('APP_ACCESS_TOKEN').replace(/["]/g, '')}`
            }
          });
        } else {
          response = await fetch(`https://estudos-nodejs-2.onrender.com/cidades?filter=${filter}`, {
            headers: {
              'authorization' : `Bearer ${localStorage.getItem('APP_ACCESS_TOKEN').replace(/["]/g, '')}`
            }
          });
        }

      const json = await response.json();
      if (json) {
        return {
          json,
          totalCount: Number(response.headers.get('X-Total-Count') || Environment.LIMITE_DE_LINHAS)
        }
      }

      return new Error('Erro ao listar regristros.')
    }
    } catch (error) {
      console.log(error);
      return new Error(error.message || 'Erro ao listar os registros.');
    }
  }, []);

  const getById =  React.useCallback( async (id = 1) => {
    try {
      if (isAuthenticated) { 
        const response = await fetch(`https://estudos-nodejs-2.onrender.com/cidades/${id}`, {
          headers: {
            'authorization' : `Bearer ${localStorage.getItem('APP_ACCESS_TOKEN').replace(/["]/g, '')}`
          }
        });
      
      const json = await response.json();
      if(response.ok === true) {
        return json;
      }
    }
      return new Error('Erro ao listar regristros.')
    } catch (error) {
      console.log(error);
      return new Error(error.message || 'Erro ao listar os registros.');
    }
  }, []);

  const create =  React.useCallback( async (form) => {
    try {
      if (isAuthenticated) { 
        
        const response = await fetch(`https://estudos-nodejs-2.onrender.com/cidades`, {
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
        const response = await fetch(`https://estudos-nodejs-2.onrender.com/cidades/${id}`, {
        method: 'DELETE',
        headers: {
          'authorization' : `Bearer ${localStorage.getItem('APP_ACCESS_TOKEN').replace(/["]/g, '')}`
        }
      });
      if(response.ok===true) {
        return 'Enviado com sucesso';
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
        const response = await fetch(`https://estudos-nodejs-2.onrender.com/cidades/${id}`, {
        method: 'PUT',
        headers: {
          'authorization' : `Bearer ${localStorage.getItem('APP_ACCESS_TOKEN').replace(/["]/g, '')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form),
      });
      const json = await response.json();
      console.log(json);
      if(response.ok===true) {
        if (json) {
          return json;
        } else return 'Atualizado com sucesso.';
      }else throw new Error(json.errors ? json.errors.default : 'Erro desconhecido ao atualizar.');
    }
    } catch (error) {
      console.log(error);
      return new Error(error.message || 'Erro ao listar os registros.');
    }
  }, []);

  return {
      getAll,
      getById,
      create,
      DeleteById,
      UpdateById
  }
  
}

export default useCidade;