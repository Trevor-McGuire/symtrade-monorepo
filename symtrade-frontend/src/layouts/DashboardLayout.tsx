import React from 'react';
import LogoutButton from '../elements/Logout';
import { withAuthCheck } from '../auth-context/auth-context';

const DashboardLayout: React.FC = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <LogoutButton />
    </div>
  );
};

export default withAuthCheck(DashboardLayout, true);