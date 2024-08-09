import React from 'react';
import { motion} from 'framer-motion';

export const DownMotion = ({children, width = 'fit-content', Animated = false}) => {

  if(!Animated) {
    return (<>{children}</>)
  } else return (
    <div style={{ position: 'relative', width , maxHeight: '550px'}}>
      <motion.div
      initial={{opacity: 0}}
      animate={{ opacity: 1, y: [80,-10,0] }}
      transition={{duration: 0.5}}
      >
      {children}
      </motion.div>
    </div>
  )
}

export const UpMotionDelay = ({children, delay}) => {
  return (
    <div style={{ position: 'relative'}}>
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [-30,5,0] }}
      transition={{duration: 0.5, delay: 0.1*delay }}
      >
      {children}
      </motion.div>
  </div>
  )
}

export const LeftMotion = ({children, isMobile, delay = 0 }) => {
  if (isMobile) return (<>{children}</>);
  else return (
   <>
      <motion.div
      initial={{opacity: 0, x: -85}}
      animate={{ opacity: 1, x: 0 }}
      transition={{duration: 0.25, delay: 0.15*delay}}
      >
      {children}
      </motion.div>
  </>
  )
}

export const OpacityMotion = ({children, isMobile, Box = false, tbody = false}) => {
  if ((isMobile || tbody) && Box) return (
    <>
       { tbody ? (
        <motion.tbody className='BoxDashBoard max_Width TableDesk'
        initial={{opacity: 0 }}
        animate={{ opacity: 1, y: [60,-10,0] }}
        transition={{duration: 0.5, delay: 0.15}}
        >
        {children}
        </motion.tbody>
       ) : (
        <motion.div
        initial={{opacity: 0 }}
        animate={{ opacity: 1, y: [60,-10,0] }}
        transition={{duration: 0.5, delay: 0.15}}
        >
        {children}
        </motion.div>
       )
      }
   </>
  );
  else if(isMobile && !Box) return (<>{children}</>);
  else return (
   <>
      <motion.div
      initial={{opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{duration: 0.25}}
      >
      {children}
      </motion.div>
  </>
  )
}

export const UpNavDelay = ({children, delay, isMobile}) => {
  if (isMobile) return (
      <div style={{ position: 'relative'}}>
        <motion.div
        initial={{opacity: 0}}
        animate={{ opacity: 1, y: [-35,5,0] }}
        transition={{duration: 0.25, delay: 0.1*delay }}
        >
        {children}
        </motion.div>
    </div>
  );
  else return (
    <div style={{ position: 'relative'}}>
      <motion.div
      initial={{opacity: 0}}
      animate={{ opacity: 1, x: [-60,5,0] }}
      transition={{duration: 0.25, delay: 0.1*delay }}
      >
      {children}
      </motion.div>
  </div>
  )
}