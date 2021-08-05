import dayjs from 'dayjs';
import {getRandomInteger} from './util';

export const POINT_TYPES = [
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

export const OFFERS = [
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

export const TYPE_DEFAULT = POINT_TYPES[3];

export const DESTINATIONS = [
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

export const NOW = dayjs();

export const formatsDateTime = {
  yearMonthDay: 'YYYY-MM-DD',
  monthDay: 'MMM D',
  dateTimeMachine: 'YYYY-MM-DDTHH:mm',
  dateTimeHumanize: 'DD/MM/YY HH:mm',
  time: 'HH:mm',
};

export const offerNames = {
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

export const generateOffer = () => (
  {
    type: POINT_TYPES[getRandomInteger(0, POINT_TYPES.length - 1)],
    offers: OFFERS.slice(getRandomInteger(0, OFFERS.length - 1), getRandomInteger(0, OFFERS.length - 1)),
  }
);
