import React from 'react';
import {motion} from 'framer-motion';

export const DownMotion = ({children, width = 'fit-content', Animated = false}) => {

  if(!Animated) {
    return (<>{children}</>)
  } else return (
    <div style={{ position: 'relative', width}}>
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