export const getCurrentStreakIcon = currentStreak => {
  let icon = '';
  if (currentStreak < 1) icon = '๐';
  else if (currentStreak < 10) icon = '๐ค';
  else if (currentStreak < 20) icon = '๐';
  else if (currentStreak < 30) icon = '๐งก';
  else if (currentStreak < 40) icon = '๐';
  else if (currentStreak < 50) icon = '๐';
  else if (currentStreak < 60) icon = '๐';
  else if (currentStreak < 70) icon = '๐ค';
  else if (currentStreak < 80) icon = '๐ค';
  else if (currentStreak < 90) icon = 'โค๏ธ';
  else if (currentStreak < 100) icon = '๐';
  else icon = 'โค๏ธโ๐ฅ';

  return icon;
};

export const getRandomInt = max => Math.floor(Math.random() * max);

const formatDate = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;
};

export const getTodaysDate = (shouldFormat = true) => {
  const today = new Date();

  return shouldFormat ? formatDate(today) : today.toString();
};

export const getTodaysDisplayDate = () => new Date().toLocaleString('en').split(',')[0];

export const getTimeDiff = (startDate, endDate, timeFormat = 'minutes') => {
  const dateTimeEnd = new Date(endDate);
  const dateTimeStart = new Date(startDate);
  const timeDiff = Math.abs(dateTimeEnd.getTime() - dateTimeStart.getTime());
  switch (timeFormat) {
    case 'seconds':
      return Math.round(timeDiff / 1000);
    case 'milliseconds':
      return timeDiff;
    case 'minutes':
    default:
      return Math.round(timeDiff / 1000 / 60);
  }
};

export const pluralize = (count, noun, suffix = 's') =>
  `${count} ${noun}${count !== 1 ? suffix : ''}`;
