import dayjs from 'dayjs';
import {
  destinations,
  generateOffer
} from '../constants.js';
import {getRandomInteger} from '../utils/common.js';

const MOCK_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus';
const DESCRIPTION_LENGTH = 5;
const MAX_PICTURES_NUMBER = 7;
const MAX_RANDOM_NUMBER = 1000;
const MIN_PRICE = 100;
const MAX_PRICE = 1000;

const generateDateTime = () => {
  const MAX_YEAR_GAP = 3;
  const MAX_MONTHS_GAP = 12;
  const MAX_DAYS_GAP = 366;
  const MAX_HOURS_GAP = 23;
  const MAX_MINUTES_GAP = 59;

  const yearsGap = getRandomInteger(-MAX_YEAR_GAP, MAX_YEAR_GAP);
  const monthsGap = getRandomInteger(-MAX_MONTHS_GAP, MAX_MONTHS_GAP);
  const daysGap = getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);
  const hoursGap = getRandomInteger(-MAX_HOURS_GAP, MAX_HOURS_GAP);
  const minutesGap = getRandomInteger(-MAX_MINUTES_GAP, MAX_MINUTES_GAP);

  const randomDateTime = dayjs()
    .add(yearsGap, 'year')
    .add(monthsGap, 'M')
    .add(daysGap, 'd')
    .add(hoursGap, 'h')
    .add(minutesGap, 'm')
    .toDate();

  return randomDateTime;
};

const generatePointName = () => {
  const randomIndex = getRandomInteger(0, destinations.length - 1);
  return destinations[randomIndex];
};

const generatePointDescription = () => {
  const descriptions = MOCK_TEXT.split('. ');

  const randomNumber = getRandomInteger(1, DESCRIPTION_LENGTH);

  const randomArray = new Array(randomNumber).fill(null).map(() => {
    const randomIndex = getRandomInteger(0, descriptions.length - 1);

    return descriptions[randomIndex];
  });

  return `${randomArray.join('. ')}.`;
};

const generatePictureDescription = () => {
  const descriptions = MOCK_TEXT.split('. ');
  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return `${descriptions[randomIndex]}.`;
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

export const generateDataPoint = () => {
  const offerPoint = generateOffer();

  const MAX_DAYS_INDEX = 2;
  const MAX_HOURS_INDEX = 23;
  const MAX_MINUTES_INDEX = 59;

  const dateFrom = dayjs(generateDateTime());
  const dateTo = dayjs(dayjs(dateFrom)
    .add(getRandomInteger(0, MAX_DAYS_INDEX), 'd')
    .add(getRandomInteger(0, MAX_HOURS_INDEX), 'h')
    .add(getRandomInteger(0, MAX_MINUTES_INDEX), 'm')
    .toDate());
  const duration = dateTo.diff(dateFrom, 'minute');

  const point = {
    id: getRandomInteger(1, MAX_RANDOM_NUMBER),
    basePrice: getRandomInteger(MIN_PRICE, MAX_PRICE),
    dateFrom: dateFrom,
    dateTo: dateTo,
    duration: duration,
    destination: {
      name: generatePointName(),
      description: generatePointDescription(),
      pictures: generatePointPictures(),
    },
    offer: offerPoint.offers,
    type: offerPoint.type,
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };

  return point;
};
