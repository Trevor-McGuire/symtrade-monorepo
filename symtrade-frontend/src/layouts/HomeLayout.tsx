import React from 'react';
import { withAuthCheck } from '../auth-context/auth-context';

const HomeLayout: React.FC = () => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default withAuthCheck(HomeLayout, false);