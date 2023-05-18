import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.pacifencesolutions.com/api',
});

export default instance;
