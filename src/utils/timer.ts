import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const transformToUTCString = (date: dayjs.Dayjs): string => {
    return date.utc().format();
};

export const transformToUTCDay = (date: dayjs.Dayjs): string => {
    return date.utc().format('YYYY-MM-DD');
};
