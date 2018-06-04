import * as cookie from './cookie';

export const getTokenFromCookie = (label = 'userToken') => {
  const userToken = cookie.get(label);
  return userToken && userToken !== '' ? userToken : undefined;
};
export const setTokenToCookie = (token, label = 'userToken') => {
  cookie.set(label, token);
};
export const removeTokenFromCookie = (label = 'userToken') => {
  cookie.remove(label);
};
