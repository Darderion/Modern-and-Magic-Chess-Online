import config from '../config';
const accTokenCookie = config.client.accTokenCookie;

const funcs = {
  setToken: (newAccToken) => localStorage.setItem(accTokenCookie, 'Bearer ' + newAccToken),
  getToken: () => localStorage.getItem(accTokenCookie),
  delToken: () => localStorage.removeItem(accTokenCookie),
  isAuth: () => {
    return localStorage.getItem(accTokenCookie) || false;
  },
}

export default funcs;