import { createContext, useContext, useEffect, useReducer } from 'react';

const authContextInitialState = {
  isAuthenticated: false,
  user: null,
  username: null,
  login: null,
  logout: null,
};

const AuthContext = createContext(authContextInitialState);

const initialState = {
  isAuthenticated: false,
  user: null,
  username: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      // save user in localStorage, expiration of 1 hour
      localStorage.setItem(
        'authData',
        JSON.stringify({ ...action.user, username: action.username, expiration: Date.now() + 3600000 }),
      );

      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
        username: action.username,
      };
    case 'LOGOUT':
      // remove user from localStorage
      localStorage.removeItem('authData');

      return {
        ...state,
        isAuthenticated: false,
        user: null,
        username: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedAuthData = localStorage.getItem('authData');
    if (storedAuthData) {
      const parsedAuthData = JSON.parse(storedAuthData);
      if (parsedAuthData.expiration > Date.now()) {
        dispatch({ type: 'LOGIN', user: parsedAuthData, username: parsedAuthData.username });
      } else {
        localStorage.removeItem('authData');
      }
    }
  }, []); // runs only on mount

  const login = (user, username) => {
    dispatch({ type: 'LOGIN', user, username });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return <AuthContext.Provider value={{ state, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Something went wrong!');
  }
  return context;
};
