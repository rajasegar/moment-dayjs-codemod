import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
dayjs.extend(minMax);

const array = [
  new Date(1996, 10, 06),
  new Date(1994, 6, 18),
  new Date(1993, 5, 25),
  new Date(1959, 10, 4),
];

dayjs.max(array.map((a) => dayjs(a)));
dayjs.min(array.map((a) => dayjs(a)));
