import dayjs from 'dayjs';
import dayjsPluginUTC from 'dayjs-plugin-utc';
dayjs.extend(dayjsPluginUTC);

dayjs('2019-07-12T15:37:01+02:00').utc().format();
