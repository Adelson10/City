import { useEffect, useState } from 'react'

const WidthScreen = () => {
  const minWidth = 910;
  const [mobile, SetMobile] = useState( () => {
    if(window.innerWidth >= minWidth) return false;
    else return true;
  });
  
  useEffect(() => {
    window.addEventListener('resize', SizeMin );
  },[]);

  function SizeMin() {
    if(window.innerWidth >= minWidth) SetMobile(false);
    else SetMobile(true);
  }

  return {isMobile: mobile};
}

export default WidthScreen;