import config from '../config';
import Cookies from 'universal-cookie';

const accTokenCookie = config.client.accTokenCookie;
const cookies = new Cookies();

const funcs = {
  setToken: (newAccToken) => {
    cookies.set(config.client.refTokenCookie, 'someText', { path: '/' });
    cookies.set(accTokenCookie, 'Bearer ' + newAccToken, { path: '/' });
  },
  getToken: () => cookies.get(accTokenCookie),
  delToken: () =>{
    cookies.set(config.client.refTokenCookie, '');
    cookies.set(accTokenCookie, '');
  },
  isAuth: () => {
    const val = cookies.get(accTokenCookie);
    return val && val !== '';
  },
}

export default funcs;