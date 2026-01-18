const TOKEN_KEY = 'taskTracker_token';
const USER_KEY = 'taskTracker_user';

export const login = (email) => {
  const fakeToken = `token_${Date.now()}`;
  localStorage.setItem(TOKEN_KEY, fakeToken);
  localStorage.setItem(USER_KEY, email);
  return true;
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const isAuthenticated = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

export const getUser = () => {
  return localStorage.getItem(USER_KEY);
};
