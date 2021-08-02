import dayjs from 'dayjs';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const formatDatePointList = (date) => dayjs(date).format('YYYY-MM-DD');
export const humanizeDatePointList = (date) => dayjs(date).format('MMM D');
export const formatDateTimePointForm = (dateTime) => dayjs(dateTime).format('DD/MM/YY hh:mm');
