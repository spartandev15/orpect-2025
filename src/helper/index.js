

export const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const getFromLocalStorage = (key) => {
  const item = localStorage.getItem(key);     
  return item ? JSON?.parse(item) : null;
};

export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const removeAllFromLocalStorage = () => {
  localStorage.clear();   
  // Cookies.remove('token');  
};
  
// export const setToCookieWithExpiry = (key, value, expires) => {
//   Cookies.set(key, value, { expires: expires });
// };
                       

