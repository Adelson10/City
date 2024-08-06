import React from 'react';
import {animate, motion} from 'framer-motion';

export const DownMotion = ({children}) => {
  return (
    <motion.div
    variants={{
        hidden: { opacity: 0 , y: 30 },
        visible: { opacity: 1, y: 0 }
    }}
    initial='hidden'
    animate='visible'
    transition={{duration: 0.5, delay: 0.1, ease: 'easeInOut'}}
    >
        {children}
    </motion.div>
  )
}