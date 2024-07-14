import React from "react";
import { Environment } from "../Environment"; 
import { useAuthContext } from "../context/AuthProvider";

const useCidade = () => {
  
  const { isAuthenticated } = useAuthContext();

  const getAll =  React.useCallback( async (page = 1, filter = '', id = 1) => {
    try {
      if (isAuthenticated) { 
        
        const response = await fetch(`https://estudos-nodejs-2.onrender.com/cidades?page=${page}&limt=${Environment.LIMITE_DE_LINHAS}&filter=${filter}&id=${id}`, {
        headers: {
          'authorization' : `Bearer ${localStorage.getItem('APP_ACCESS_TOKEN').replace(/["]/g, '')}`
        }
      });
      const json = await response.json();
      console.log(json);
      for (var pair of response.headers.entries()) {
        console.log(pair[0]+ ': '+ pair[1]);
      }
      console.log(response.headers['x-total-count']);
    }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return {
      getAll,
  }
  
}

export default useCidade;