import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
dayjs.extend(dayOfYear);
dayjs().dayOfYear();
dayjs().dayOfYear(277);
