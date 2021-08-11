import dayjs from 'dayjs';

const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;

export const formateDateTime = (date, format) => dayjs(date).format(format);

export const humanizeTimeDuration = (durationObject) => {
  const hours = durationObject.diffHours%HOURS_IN_DAY;
  const minutes = durationObject.diffMinutes%MINUTES_IN_HOUR;

  return {
    days: durationObject.diffDays,
    hours: hours,
    minutes: minutes,
  };
};
