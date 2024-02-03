import React from 'react';
import { Link } from 'react-router-dom';
import {AuthenticationForm} from '../elements/AuthenticationForm';

const SignInLayout: React.FC = () => {
  return (
    <div data-testid="sign-in-layout"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>Sign In</h1>
      <Link to="/">Home</Link>
      <Link to="/signed-in">Signed In</Link>
      <AuthenticationForm />
    </div>
  );
};

export default SignInLayout;