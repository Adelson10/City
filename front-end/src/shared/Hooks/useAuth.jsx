import React from "react";


const useAuth = () => {
    
    const post = React.useCallback( async (path, data) => {
        try {
            const response = await fetch(`https://estudos-nodejs-2.onrender.com${path}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data)
            });
            const json = await response.json();
            if (response.ok!==true) {
              throw new Error(json.errors.default);
            }else return json;
          } catch (error) {
            throw new Error(error.message);
          }
    });
  
    return {
        post,
    }
}

export default useAuth