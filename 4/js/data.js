import {createRandomDescription} from './util.js';

const OBJECT_COUNT = 25;

//Функция cоздания и вывода массива
const getObjectOutput = () =>
  Array.from({
    length: OBJECT_COUNT,
  }, createRandomDescription);

export {getObjectOutput};
