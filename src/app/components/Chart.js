import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const Chart = ({ 
  title, 
  children, 
  height = 400,
  loading = false,
  ...props 
}) => {
  return (
    <Paper elevation={1} sx={{ p: 3, ...props.sx }}>
      {title && (
        <Typography variant="h6" component="h3" gutterBottom>
          {title}
        </Typography>
      )}
      
      <Box sx={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loading ? (
          <Typography color="text.secondary">Cargando gráfico...</Typography>
        ) : (
          children
        )}
      </Box>
    </Paper>
  );
};

export default Chart;