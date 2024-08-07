import React, { useContext } from 'react';

export const DarkModeContext = React.createContext();

export const DarkModeProvider = ({children}) => {
    const LOCAL_STORAGE_DARK_MODE = 'APP_DARK_MODE';
    
    React.useEffect(() => {
        const acessDark = localStorage.getItem(LOCAL_STORAGE_DARK_MODE);
        if (acessDark) {
            switch (acessDark) {
                case 'dark':
                    setDarkMode();
                break;
                case 'light':
                    setLightMode();
                break;
            }
        } else {
            setLightMode();
        }
    },[]);

    const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'dark');
        localStorage.setItem(LOCAL_STORAGE_DARK_MODE, 'dark');
    }

    const setLightMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'light');
        localStorage.setItem(LOCAL_STORAGE_DARK_MODE, 'light');
    }


    const toggleTheme = () => {
        const check = document.querySelector('body').getAttribute('data-theme');
        if ( check === 'light') {
            setDarkMode();
        }
        else setLightMode(); 
    }
    
    return (<DarkModeContext.Provider value={{toggleTheme}}>
        {children}
    </DarkModeContext.Provider>) 
}

export const useDarkContext = () => useContext(DarkModeContext);