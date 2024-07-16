import React from 'react'

const useFilterTable = () => {

    const filterTable = React.useCallback( (json, filter) => {
        if(!json) {
          return ;
        } else {
          const FilterCidades = json.map( (value) => {
            const id = value.id;
            const data = Object.values(Object.fromEntries(Object.entries(value).filter(([key]) => ( filter.includes(key) ))));
            return { id, data }
           }
          );
          return { body: FilterCidades, head: filter }
        };
    });

  return {filterTable};
}

export default useFilterTable;