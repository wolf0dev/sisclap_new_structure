import React from 'react';
import { Box, Typography } from '@mui/material';
import { FileQuestion } from 'lucide-react';
import Button from './Button';

const EmptyState = ({
  title,
  description,
  actionText,
  onAction,
  icon = <FileQuestion size={80} />,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: 8,
        px: 2,
      }}
    >
      <Box sx={{ color: 'text.secondary', mb: 2 }}>{icon}</Box>
      <Typography variant="h5" component="h2" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
        {description}
      </Typography>
      {actionText && onAction && (
        <Button variant="contained" color="primary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;