import moment from 'moment';

const fmt = 'hh:mm, DD MMMM YYYY';

export function isBefore(a, b) {
  const parsedA = moment(a, fmt);
  const parsedB = moment(b, fmt);
  return parsedA.isBefore(parsedB);
}

export function isAfter(a, b) {
  const parsedA = moment(a, fmt);
  const parsedB = moment(b, fmt);
  return parsedA.isAfter(parsedB);
}

export function timeFmt(time) {
  return moment(time).format(fmt);
}

export function filterBasedOnTime(flights, filters) {
  if (!flights.length) return [];

  const filterKeys = Object.keys(filters);
  if (!filterKeys.length) return flights;

  return flights.filter(flight => {
    const notMatched = filterKeys.filter(key => {
      const compare = key.startsWith('departure') ? isBefore : isAfter;
      return compare(flight[key], filters[key]);
    });

    return notMatched.length === 0;
  });
}
