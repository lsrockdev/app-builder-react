import moment from 'moment';

export const epochToString = function (sec, format) {
  return moment.unix(sec).format(format);
};