import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

dayjs('2019–10–05').isBetween('2019–10–04', '2019–10–06');
