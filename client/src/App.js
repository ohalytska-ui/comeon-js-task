import React from 'react';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

import { AuthProvider, useAuth } from './context/AuthContext';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';

import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Casino from './pages/Casino';
import Game from './pages/Game';

const App = () => {
  const { state } = useAuth();

  const loader = async () => {
    if (!state.isAuthenticated) {
      return redirect('/');
    }
    return null;
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/casino',
      element: <Casino />,
      loader: loader,
    },
    {
      path: '/game/:id',
      element: <Game />,
      loader: loader,
    },
    {
      // catch-all route for 404 Not Found
      path: '*',
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

const AppWithProviders = ({ appProps }) => {
  return (
    <AuthProvider>
      <App {...appProps} />
    </AuthProvider>
  );
};
export default AppWithProviders;
