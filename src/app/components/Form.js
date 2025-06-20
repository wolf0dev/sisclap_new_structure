import React from 'react';
import { Box, Paper, Typography, Divider } from '@mui/material';

const Form = ({ 
  title, 
  subtitle,
  children, 
  onSubmit, 
  actions,
  elevation = 1,
  ...props 
}) => {
  return (
    <Paper elevation={elevation} sx={{ p: 3, ...props.sx }}>
      {title && (
        <>
          <Typography variant="h5" component="h2" gutterBottom>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary" paragraph>
              {subtitle}
            </Typography>
          )}
          <Divider sx={{ mb: 3 }} />
        </>
      )}
      
      <Box component="form" onSubmit={onSubmit} noValidate>
        {children}
        
        {actions && (
          <>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              {actions}
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default Form;