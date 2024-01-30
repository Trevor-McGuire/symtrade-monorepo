import React from 'react';
import { Link } from 'react-router-dom';

const SignIn: React.FC = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <Link to="/">Home</Link>
      <Link to="/signed-in">Signed In</Link>
    </div>
  );
};

export default SignIn;