import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/sign-in">Sign In</Link>
      <Link to="/signed-in">Signed In</Link>
    </div>
  );
};

export default Home;