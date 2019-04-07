import axios from 'axios';
import CONFIG from '../config';

const httpService = {
  get,
};

const client = axios.create({
  baseURL: `${CONFIG.CORS_PROXY}${CONFIG.BASE_URL}`,
  timeout: 10000,
});

function get(path) {
  return client.get(path).then(response => response.data);
}

export default httpService;
