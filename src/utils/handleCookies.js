import { COOKIE_NAMES } from '../constants';

export const createCookie = (name, value, daysToExpire = 7) => {
  const date = new Date();
  date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000); // Convert days to milliseconds
  const expires = 'expires=' + date.toUTCString();
  document.cookie = name + '=' + value + ';' + expires + ';path=/';
};

export const removeCookie = name => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

export const getCookieValue = name => {
  const cookies = document.cookie.split('; ');
  const cookieValue = cookies.find(cookie => {
    return cookie.split('=')[0] === name;
  });

  if (cookieValue) return cookieValue.split('=')[1];

  return null;
};

export const getAuthTokenFromCookie = () => {
  return getCookieValue(COOKIE_NAMES.AUTH_TOKEN);
};

