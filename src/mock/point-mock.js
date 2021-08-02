import dayjs from 'dayjs';
import {getRandomInteger} from '../util.js';

const MOCK_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus';

const DESCRIPTION_LENGTH = 5;

const MAX_PICTURES_NUMBER = 7;

const MAX_RANDOM_NUMBER = 1000;

const MIN_PRICE = 100;

const MAX_PRICE = 1000;

const offersByType = [
  {
    type: 'taxi',
    offers: [
      {
        title: 'Upgrade to a business class',
        price: 190,
      },
      {
        title: 'Choose the radio station',
        price: 30,
      },
      {
        title: 'Choose temperature',
        price: 170,
      },
      {
        title: `Drive quickly, I'm in a hurry`,
        price: 100,
      },
      {
        title: 'Drive slowly',
        price: 110,
      },
    ],
  },
  {
    type: 'bus',
    offers: [
      {
        title: 'Infotainment system',
        price: 50,
      },
      {
        title: 'Order meal',
        price: 100,
      },
      {
        title: 'Choose seats',
        price: 190,
      },
    ],
  },
  {
    type: 'train',
    offers: [
      {
        title: 'Book a taxi at the arrival point',
        price: 110,
      },
      {
        title: 'Order a breakfast',
        price: 80,
      },
      {
        title: 'Wake up at a certain time',
        price: 140,
      },
    ],
  },
  {
    type: 'flight',
    offers: [
      {
        title: 'Choose meal',
        price: 120,
      },
      {
        title: 'Choose seats',
        price: 90,
      },
      {
        title: 'Upgrade to comfort class',
        price: 120,
      },
      {
        title: 'Upgrade to business class',
        price: 120,
      },
      {
        title: 'Add luggage',
        price: 170,
      },
      {
        title: 'Business lounge',
        price: 160,
      },
    ],
  },
  {
    type: 'check-in',
    offers: [
      {
        title: 'Choose the time of check-in',
        price: 70,
      },
      {
        title: 'Choose the time of check-out',
        price: 190,
      },
      {
        title: 'Add breakfast',
        price: 110,
      },
      {
        title: 'Laundry',
        price: 140,
      },
      {
        title: 'Order a meal from the restaurant',
        price: 30,
      },
    ],
  },
  {
    type: 'sightseeing',
    offers: [],
  },
  {
    type: 'ship',
    offers: [
      {
        title: 'Choose meal',
        price: 130,
      },
      {
        title: 'Choose seats',
        price: 160,
      },
      {
        title: 'Upgrade to comfort class',
        price: 170,
      },
      {
        title: 'Upgrade to business class',
        price: 150,
      },
      {
        title: 'Add luggage',
        price: 100,
      },
      {
        title: 'Business lounge',
        price: 40,
      },
    ],
  },
  {
    type: 'drive',
    offers: [
      {
        title: 'Choose comfort class',
        price: 110,
      },
      {
        title: 'Choose business class',
        price: 180,
      },
    ],
  },
  {
    type: 'restaurant',
    offers: [
      {
        title: 'Choose live music',
        price: 150,
      },
      {
        title: 'Choose VIP area',
        price: 70,
      },
    ],
  },
];

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

const generateOfferPoint = () => {
  const randomIndex = getRandomInteger(0, offersByType.length - 1);

  return offersByType[randomIndex];
};

export const generateDataPoint = () => {
  const offerPoint = generateOfferPoint();
  const randomNumber = getRandomInteger(0, offerPoint.offers.length - 1);

  const randomDateTime = generateDateTime();

  const maxDaysIndex = 2;
  const maxHoursIndex = 23;
  const maxMinutesIndex = 59;

  const point = {
    id: getRandomInteger(1, MAX_RANDOM_NUMBER),
    basePrice: getRandomInteger(MIN_PRICE, MAX_PRICE),
    dateFrom: randomDateTime,
    dateTo: dayjs(randomDateTime)
      .add(getRandomInteger(0, maxDaysIndex), 'd')
      .add(getRandomInteger(0, maxHoursIndex), 'h')
      .add(getRandomInteger(0, maxMinutesIndex), 'm')
      .toDate(),
    destination: {
      name: generatePointName(),
      description: generatePointDescription(),
      pictures: generatePointPictures(),
    },
    offer: {
      offers: offerPoint.offers.slice(randomNumber),
    },
    type: offerPoint.type,
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };

  return point;
};
