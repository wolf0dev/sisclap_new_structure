import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { Footer } from '../components';

const DefaultLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default DefaultLayout;