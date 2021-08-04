import dayjs from 'dayjs';

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

export const OFFERS_BY_TYPE = [
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
        title: 'Drive quickly, I\'m in a hurry',
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
