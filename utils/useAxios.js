import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';

const useAxios = makeUseAxios({
  axios: axios.create({ baseURL: 'http://103.245.17.2:2500/rsjkt-rest/api' })
});

export default useAxios;
