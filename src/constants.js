import dayjs from 'dayjs';

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

export const PointTypes = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  FLIGHT: 'flight',
  CHECKIN: 'check-in',
  SIGHTSEENG: 'sightseeing',
  SHIP: 'ship',
  DRIVE: 'drive',
  RESTAURANT: 'restaurant',
  TRANSPORT: 'transport',
};

export const POINT_TYPES = Object.values(PointTypes);

export const DEFAULT_TYPE = 'flight';

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

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const Units = {
  MONEY: '€ ',
  TYPE: 'x',
  TIME: '',
};


