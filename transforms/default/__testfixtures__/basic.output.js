const now = dayjs();
const day = dayjs('2021-05-28');

const date1 = dayjs('2019-07-11');
const date2 = dayjs('2019-07-10');
date1.diff(date2, 'year');
date1.diff(date2, 'day');

dayjs().second();
dayjs().set('second', 30);

dayjs().hour();
dayjs().set('hour', 13);

dayjs().date();
dayjs().set('date', 6);

dayjs().day();
dayjs().set('day', -14);

dayjs().add(7, 'day');
dayjs().subtract(7, 'day');
