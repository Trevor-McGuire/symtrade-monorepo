import React from 'react';
import {AuthenticationForm} from '../elements/AuthenticationForm';
import { withAuthCheck } from '../auth-context/auth-context';
import { useLocation } from 'react-router-dom';

const AuthenticationLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div data-testid="sign-in-layout"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>{location.pathname === '/login' ? 'Login' : 'Register'}</h1>
      <AuthenticationForm />
    </div>
  );
};

export default withAuthCheck(AuthenticationLayout, false)