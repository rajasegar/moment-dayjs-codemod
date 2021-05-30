import moment from 'moment';

const a = moment('2000-01-01');
moment(1568751159000).fromNow();
moment(1568751159000).from(a);
moment(1568751159000).to(a);
moment(1568751159000).toNow();
