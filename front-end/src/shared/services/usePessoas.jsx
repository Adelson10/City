import React from "react";
import { Environment } from "../Environment"; 
import { useAuthContext } from "../context/AuthProvider";

const usePessoas = () => {
  
  const { isAuthenticated } = useAuthContext();

  const getAll =  React.useCallback( async (page = 1, filter = '', id = 1) => {
    try {
      if (isAuthenticated) { 
        
        const response = await fetch(`https://estudos-nodejs-2.onrender.com/pessoas?page=${page}&limt=${Environment.LIMITE_DE_LINHAS}&filter=${filter}&id=${id}`, {
        headers: {
          'authorization' : `Bearer ${localStorage.getItem('APP_ACCESS_TOKEN').replace(/["]/g, '')}`
        }
      });
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

export default usePessoas;