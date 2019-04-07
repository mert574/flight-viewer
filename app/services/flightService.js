import uuid from 'uuid/v4';
import moment from 'moment';
import { renameObjectKeys } from '../utils/objectHelpers';
import httpService from './httpService';
import CONFIG from '../config';

const flightService = {
  fetchCheapFlights,
  fetchBusinessFlights,
  fetchFlights,
};

const dateFormat = 'hh:mm, DD MMMM YYYY';

function parseCheapFlights(response) {
  const responseRenamingMap = {
    arrival: 'arrival',
    arrivalTime: 'arrivalTime',
    departure: 'departure',
    departureTime: 'departureTime',
    id: 'originalId',
  };

  return response
    .map(flight => renameObjectKeys(flight, responseRenamingMap))
    .map(flight => ({
      ...flight,
      id: uuid(),
      category: 'cheap',
      arrivalTime: moment(flight.arrivalTime).format(dateFormat),
      departureTime: moment(flight.departureTime).format(dateFormat),
    }));
}

function parseBusinessFlights(response) {
  const responseRenamingMap = {
    arrival: 'arrivalTime',
    departure: 'departureTime',
    flight: 'flight',
    uuid: 'originalId',
  };

  return response
    .map(flight => renameObjectKeys(flight, responseRenamingMap))
    .map(flight => {
      const [departure, arrival] = flight.flight.split(' -> ');

      return {
        id: uuid(),
        departure,
        arrival,
        originalId: flight.originalId,
        arrivalTime: moment(flight.arrivalTime).format(dateFormat),
        departureTime: moment(flight.departureTime).format(dateFormat),
        category: 'business',
      };
    });
}

function fetchCheapFlights() {
  return httpService.get(CONFIG.CHEAP_PATH).then(parseCheapFlights);
}

function fetchBusinessFlights() {
  return httpService.get(CONFIG.BUSINESS_PATH).then(parseBusinessFlights);
}

async function fetchFlights() {
  const [cheap, business] = await Promise.all([
    fetchCheapFlights(),
    fetchBusinessFlights(),
  ]);

  return cheap.concat(business);
}

export default flightService;
