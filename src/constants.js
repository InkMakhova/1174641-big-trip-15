import dayjs from 'dayjs';
import {getRandomInteger} from './utils/common.js';

export const FormType = {
  NEW: 'new',
  EDIT: 'edit',
};

export const MenuItem = {
  TABLE: 'Table',
  STATISTICS: 'Stats',
};

export const filtersList = {
  everything: true,
  past: false,
  future: false,
};

export const FilterType = {
  EVERYTHING: 'everything',
  PAST: 'past',
  FUTURE: 'future',
};

export const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

export const defaultSortType = SortType.DAY;

export const disabledSortFields = [
  SortType.EVENT,
  SortType.OFFER,
];

export const pointTypes = [
  'taxi',
  'bus',
  'train',
  'flight',
  'check-in',
  'sightseeing',
  'ship',
  'drive',
  'restaurant',
];

export const offerOptions = [
  {
    title: 'Choose the radio station',
    price: 30,
  },
  {
    title: 'Choose temperature',
    price: 170,
  },
  {
    title: 'Drive quickly, I\'m in a hurry',
    price: 100,
  },
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
  {
    title: 'Choose meal',
    price: 120,
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
];

export const OffersSetByTypes = {
  'taxi': [
    {
      title: 'Drive quickly, I\'m in a hurry',
      price: 100,
    },
    {
      title: 'Upgrade to comfort class',
      price: 120,
    },
    {
      title: 'Choose the radio station',
      price: 30,
    },
  ],
  'bus': [
    {
      title: 'Infotainment system',
      price: 50,
    },
    {
      title: 'Choose seats',
      price: 190,
    },
  ],
  'train': [
    {
      title: 'Choose meal',
      price: 120,
    },
    {
      title: 'Upgrade to business class',
      price: 120,
    },
  ],
  'flight': [
    {
      title: 'Choose seats',
      price: 190,
    },
    {
      title: 'Upgrade to business class',
      price: 120,
    },
    {
      title: 'Add luggage',
      price: 170,
    },
  ],
  'check-in': [
    {
      title: 'Choose meal',
      price: 120,
    },
  ],
  'sightseeing': [],
  'ship': [
    {
      title: 'Choose seats',
      price: 190,
    },
    {
      title: 'Upgrade to business class',
      price: 120,
    },
  ],
  'drive': [
    {
      title: 'Upgrade to comfort class',
      price: 120,
    },
    {
      title: 'Choose the radio station',
      price: 30,
    },
  ],
  'restaurant': [],
};

export const defaultType = pointTypes[3];

export const destinations = [
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

export const today = dayjs();

export const FormatsDateTime = {
  YYYY_MM_DD: 'YYYY-MM-DD',
  MMM_D: 'MMM D',
  YYYY_MM_DD_TIME: 'YYYY-MM-DDTHH:mm',
  DD_MM_YY_TIME: 'DD/MM/YY HH:mm',
  HH_MM: 'HH:mm',
  ISO: 'YYYY-MM-DDTHH:mm:ss.000Z',

};

export const offersNames = {
  upgradeComfort: 'Upgrade to comfort class',
  chooseComfort: 'Choose comfort class',
  chooseBusiness: 'Choose business class',
  upgradeBusiness: 'Upgrade to a business class',
  airBusiness: 'Upgrade to business class',
  radio: 'Choose the radio station',
  temperature: 'Choose temperature',
  hurry: 'Drive quickly, I\'m in a hurry',
  slowly: 'Drive slowly',
  info: 'Infotainment system',
  orderMeal: 'Order meal',
  chooseMeal: 'Choose meal',
  restaurantMeal: 'Order a meal from the restaurant',
  seats: 'Choose seats',
  taxi: 'Book a taxi at the arrival point',
  orderBreakfast: 'Order a breakfast',
  addBreakfast: 'Add breakfast',
  wakeup: 'Wake up at a certain time',
  luggage: 'Add luggage',
  lounge: 'Business lounge',
  checkin: 'Choose the time of check-in',
  checkout: 'Choose the time of check-out',
  laundry: 'Laundry',
  music: 'Choose live music',
  vip: 'Choose VIP area',
};

export const generateOffer = () => {
  const type = pointTypes[getRandomInteger(0, pointTypes.length - 1)];
  return {
    type: type,
    offers: OffersSetByTypes[type].slice(getRandomInteger(0, OffersSetByTypes[type].length - 1)),
  };
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};


