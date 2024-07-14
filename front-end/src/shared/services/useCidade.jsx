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
      console.log(response.headers.get("X-Total-Count"));
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