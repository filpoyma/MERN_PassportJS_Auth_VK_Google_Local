import React from 'react';

export default React.createContext({
  user: {},
  isAuth: false,
  setUser: (val) => {},
  setAuth: (val) => {},
});
