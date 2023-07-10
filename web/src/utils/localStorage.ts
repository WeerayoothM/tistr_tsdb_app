const TOKEN = "token";

export const setToken = (token: string) => localStorage.setItem(TOKEN, token);

export const getToken = () => localStorage.getItem(TOKEN);

export const removeToken = () => localStorage.removeItem(TOKEN);

export const getRole = () => {
  if (getToken()) {
    return "user";
  }
  return "guest";
};

// completed
