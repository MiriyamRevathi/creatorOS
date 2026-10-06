import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Overview } from './Overview';

export const Dashboard = () => {
  return (
    <DashboardLayout>
      <Overview />
    </DashboardLayout>
  );
};
