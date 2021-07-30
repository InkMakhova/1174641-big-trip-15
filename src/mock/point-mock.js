import {getRandomInteger} from '../util.js';
import {POINT_TYPES} from '../constants.js';

const MOCK_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`;

const DESCRIPTION_LENGTH = 5;

const MAX_PICTURES_NUMBER = 7;

const MAX_RANDOM_NUMBER = 1000;

const generatePointName = () => {
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

const generatePointDescription = () => {
  const descriptionArray = MOCK_TEXT.split('. ');

  const randomNumber = getRandomInteger(1, DESCRIPTION_LENGTH);

  const randomArray = new Array(randomNumber).fill(null).map(() => {
    const randomIndex = getRandomInteger(0, descriptionArray.length - 1);

    return descriptionArray[randomIndex];
  });

  return `${randomArray.join('. ')}.`;
};

const generatePictureDescription = () => {
  const descriptionArray = MOCK_TEXT.split('. ');
  const randomIndex = getRandomInteger(0, descriptionArray.length - 1);

  return `${descriptionArray[randomIndex]}.`;
};

const generatePointPictures = () => {
  const randomNumber = getRandomInteger(1, MAX_PICTURES_NUMBER);

  const pictures = new Array(randomNumber).fill(null).map(() => {
    const picture = {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(1, MAX_RANDOM_NUMBER)}`,
      description: generatePictureDescription(),
    };

    return picture;
  });

  return pictures;
};
