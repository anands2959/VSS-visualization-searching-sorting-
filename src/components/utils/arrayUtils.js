export const generateRandomArray = (size, min = 5, max = 400) => {
  return Array.from({ length: size }, () => 
    Math.floor(Math.random() * (max - min) + min)
  );
};

export const generateSortedArray = (size, min = 5, max = 400) => {
  const array = generateRandomArray(size, min, max);
  return array.sort((a, b) => a - b);
};

export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const calculateDelay = (speed) => {
  return Math.max(500 - speed * 4, 1);
};
