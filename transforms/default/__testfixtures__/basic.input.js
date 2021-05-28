const now = moment();
const day = moment('2021-05-28');

const date1 = moment('2019-07-11');
const date2 = moment('2019-07-10');
date1.diff(date2, 'years');
date1.diff(date2, 'days');

moment().seconds();
moment().seconds(30);

moment().hours();
moment().hours(13);

moment().date();
moment().date(6);

moment().day();
moment().day(-14);

moment().add(7, 'days');
moment().subtract(7, 'days');
