import React from 'react';
import { Link } from 'react-router-dom';

const SignedIn: React.FC = () => {
  return (
    <div>
      <h1>Signed In</h1>
      <Link to="/">Home</Link>
      <Link to="/sign-in">Sign In</Link>
    </div>
  );
};

export default SignedIn;