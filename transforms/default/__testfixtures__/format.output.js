import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

dayjs().format('dddd, MMMM Do YYYY, h:mm:ss A');
dayjs().format('ddd, hA');
