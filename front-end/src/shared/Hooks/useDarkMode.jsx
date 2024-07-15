import React from 'react';

export const DarkModeContext = React.createContext();

const useDarkMode = () => {
    
    const styles = React.useMemo(() => {
        const check = document.querySelector("body").getAttribute('data-theme');
        if (check == 'light') {
            return {
                color: '#818181',
            }
         }else {
            return {
                color: '#fff',
            }
        }
    });

    const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'dark');
    }

    const setLightMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'light');
    }

    const DarkMode = ({children}) => { 
        setLightMode();
        return (<DarkModeContext.Provider value={styles}>
            {children}
        </DarkModeContext.Provider>) 
    }

    const toggleTheme = () => {
        const check = document.querySelector("body").getAttribute('data-theme');
        if ( check === 'light') setDarkMode();
        else setLightMode(); 
    }
  return {
    DarkMode,
    toggleTheme,
    styles
  }
}

export default useDarkMode;