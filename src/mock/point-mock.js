import dayjs from 'dayjs';
import {getRandomInteger} from '../utils/common.js';
import {
  DESTINATIONS,
  generateOffer
} from '../constants.js';

const MOCK_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus';

const DESCRIPTION_LENGTH = 5;

const MAX_PICTURES_NUMBER = 7;

const MAX_RANDOM_NUMBER = 1000;

const MIN_PRICE = 100;

const MAX_PRICE = 1000;

const generateDateTime = () => {
  const maxYearGap = 3;
  const maxMonthsGap = 12;
  const maxDaysGap = 366;
  const maxHours = 23;
  const maxMinutes = 59;

  const yearsGap = getRandomInteger(-maxYearGap, maxYearGap);
  const monthsGap = getRandomInteger(-maxMonthsGap, maxMonthsGap);
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const hoursGap = getRandomInteger(-maxHours, maxHours);
  const minutesGap = getRandomInteger(-maxMinutes, maxMinutes);

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
  const randomIndex = getRandomInteger(0, DESTINATIONS.length - 1);
  return DESTINATIONS[randomIndex];
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

export const generateDataPoint = () => {
  const offerPoint = generateOffer();

  const maxDaysIndex = 2;
  const maxHoursIndex = 23;
  const maxMinutesIndex = 59;

  const dateFrom = dayjs(generateDateTime());
  const dateTo = dayjs(dayjs(dateFrom)
    .add(getRandomInteger(0, maxDaysIndex), 'd')
    .add(getRandomInteger(0, maxHoursIndex), 'h')
    .add(getRandomInteger(0, maxMinutesIndex), 'm')
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
