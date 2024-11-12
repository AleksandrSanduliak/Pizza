export const itemVariants = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export const parentVariants = {
  initial: {
    clipPath: 'polygon(25% 25%, 25% 25, 25% 25, 25% 25)',
    transition: {
      when: 'beforeChildren',
    },
  },
  animate: {
    clipPath: 'inset(0% 0% 0% 0% round 10px)',
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.25,
      delayChildren: 0.1,
      staggerChildren: 0.07,
      when: 'beforeChildren',
    },
  },
  exit: {
    clipPath: 'inset(10% 50% 90% 50% round 10px)',
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.25,
      when: 'afterChildren',
    },
  },
};
