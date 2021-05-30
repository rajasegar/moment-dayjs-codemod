import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const a = dayjs('2000-01-01');
dayjs(1568751159000).fromNow();
dayjs(1568751159000).from(a);
dayjs(1568751159000).to(a);
dayjs(1568751159000).toNow();
