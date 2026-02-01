import { Variants } from 'motion/react';

// Fade in up animation variant
export const fadeInUpVariant: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    filter: 'blur(4px)'
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] // Custom easing curve
    }
  }
};

// Stagger container for animating children
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Scale up animation
export const scaleUpVariant: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// Slide in from left
export const slideInLeftVariant: Variants = {
  hidden: { 
    opacity: 0, 
    x: -20 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1]
    }
  }
};

// Slide in from right
export const slideInRightVariant: Variants = {
  hidden: { 
    opacity: 0, 
    x: 20 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1]
    }
  }
};

// Card hover animation
export const cardHoverVariant: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  hover: {
    scale: 1.02,
    y: -4,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};