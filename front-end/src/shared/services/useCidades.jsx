import React from "react";
import { Environment } from "../Environment"; 
import { useAuthContext } from "../context/AuthProvider";

const useCidade = () => {
  
  const { isAuthenticated } = useAuthContext();

  const getAll =  React.useCallback( async (filter = '', page = 1 , id = 1) => {
    try {
      if (isAuthenticated) { 
        let response = undefined;
        if(id>0) {
          response = await fetch(`https://estudos-nodejs-2.onrender.com/cidades?page=${page}&limt=${Environment.LIMITE_DE_LINHAS}&filter=${filter}&id=${id}`, {
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

  return {
      getAll,
  }
  
}

export default useCidade;