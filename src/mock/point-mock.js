import {getRandomInteger} from '../util.js';
import {POINT_TYPES} from '../constants.js';

const generateTypePoint = () => {
  const randomIndex = getRandomInteger(0, POINT_TYPES.length - 1);
  return POINT_TYPES[randomIndex];
};

const generateDestinationPoint = () => {
  const destinations = [
    'Amsterdam',
    'Munich',
    'Vienna',
    'Rome',
    'Prague',
    'Barcelona',
    'Oslo',
    'Stockholm',
    'Reykjavik',
    'Helsinki',
    'Charleston',
    'San Francisco',
  ];

  const randomIndex = getRandomInteger(0, destinations.length - 1);
  return destinations[randomIndex];
};
