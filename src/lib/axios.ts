import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://kelompok1.serverku.org',
  withCredentials: true,
});

export default instance;