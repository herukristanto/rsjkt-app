import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';

// TODO Change temp ip
export const baseAxios = axios.create({
  // baseURL: 'http://apirsj.rsjakarta.co.id:2500/rsjkt-rest/api',
  baseURL: 'http://103.24.104.133:2500/rsjkt-rest/api', // temp api
  // baseURL: 'http://103.245.17.2:2500/rsjkt-rest/api',
  headers: {
    'content-tpe': 'application/json',
    Accept: 'application/json',
  },
});

const useAxios = makeUseAxios({
  axios: baseAxios,
});

export default useAxios;
