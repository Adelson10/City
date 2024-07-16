import React, { useContext } from 'react';

export const DarkModeContext = React.createContext();

export const DarkModeProvider = ({children}) => {
    
    const [style, setStyle] = React.useState({});

    React.useEffect(() => {
        setLightMode();
        setStyle(handleMode());
    },[]);

    
  function handleMode() {
    const check = document.querySelector('body').getAttribute('data-theme');
    console.log(check);
           if (check === 'light') {
               return {
                   color: '#818181',
                   icon: 'sun',
                   colorIcon: '#818181'
               }
           } else {
               return {
                   color: '#fff',
                   icon: 'moon',
                   colorIcon: 'yellow'
               }
    }
  }

    const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'dark');
    }

    const setLightMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'light');
    }


    const toggleTheme = () => {
        const check = document.querySelector('body').getAttribute('data-theme');
        if ( check === 'light') {
            setDarkMode();
        }
        else setLightMode(); 
        setStyle((style) => style = handleMode());
    }

    const ColorBase = '#00a519';
    
    return (<DarkModeContext.Provider value={{toggleTheme,style,setStyle,ColorBase}}>
        {children}
    </DarkModeContext.Provider>) 
}

export const useDarkContext = () => useContext(DarkModeContext);