import {getRandomInteger} from '../util.js';
import {POINT_TYPES} from '../constants.js';

const generateTypePoint = () => {
  const randomIndex = getRandomInteger(0, POINT_TYPES.length - 1);
  return POINT_TYPES[randomIndex];
};
