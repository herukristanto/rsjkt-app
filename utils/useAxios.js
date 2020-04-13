import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';

export const baseAxios = axios.create({
  baseURL: 'http://103.245.17.2:2500/rsjkt-rest/api',
});

const useAxios = makeUseAxios({
  axios: baseAxios,
});

export default useAxios;
