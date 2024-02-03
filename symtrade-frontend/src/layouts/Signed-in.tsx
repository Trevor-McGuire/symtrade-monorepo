import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../elements/Logout';

const SignedInLayout: React.FC = () => {
  return (
    <div>
      <h1>Signed In</h1>
      <Link to="/">Home</Link>
      <Link to="/sign-in">Sign In</Link>
      <LogoutButton />
    </div>
  );
};

export default SignedInLayout;