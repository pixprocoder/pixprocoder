export const setToLocalStorage = (key: string, token: string) => {
  if (!key || typeof window === 'undefined') {
    return null;
  }
  return localStorage.setItem(key, token);
};

export const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem(key);
};
