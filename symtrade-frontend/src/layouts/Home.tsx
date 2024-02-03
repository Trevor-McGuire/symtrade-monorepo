import React from 'react';
import { Link } from 'react-router-dom';

const HomeLayout: React.FC = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/signed-in">Signed In</Link>
    </div>
  );
};

export default HomeLayout;