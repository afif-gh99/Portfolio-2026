export const heroLines = [
  "YOU\u2019RE NOT HERE",
  "FOR ANOTHER BASIC",
  "PORTFOLIO.",
];

export const heroMeta = [
  "Frontend Developer",
  "Software Engineer",
  "Business Mindset",
];

export const easing = [0.16, 1, 0.3, 1];

export const contentVariants = {
  hidden: {
    transition: {
      staggerChildren: 0.08,
      staggerDirection: -1,
    },
  },
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.08,
    },
  },
};

export const contentItemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: "blur(6px)",
    transition: { duration: 0.4, ease: easing },
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: easing },
  },
};

export const headlineVariants = {
  hidden: {
    transition: {
      staggerChildren: 0.06,
      staggerDirection: -1,
    },
  },
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
};

export const headlineLineVariants = {
  hidden: {
    opacity: 0,
    x: -34,
    filter: "blur(6px)",
    transition: { duration: 0.55, ease: easing },
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 1.3, ease: easing },
  },
};

export const portraitVariants = {
  hidden: {
    opacity: 0,
    x: 52,
    scale: 1.07,
    filter: "blur(8px)",
    transition: { duration: 0.75, ease: easing },
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1, delay: 0.4, ease: easing },
  },
};

export const scrollCueVariants = {
  hidden: {
    opacity: 0,
    y: 10,
    filter: "blur(4px)",
    transition: { duration: 0.35, ease: easing },
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, delay: 2.15, ease: easing },
  },
};
