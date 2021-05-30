import moment from 'moment';

const array = [
  new Date(1996, 10, 06),
  new Date(1994, 6, 18),
  new Date(1993, 5, 25),
  new Date(1959, 10, 4),
];

moment.max(array.map((a) => moment(a)));
moment.min(array.map((a) => moment(a)));
