import React from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';

const Button = ({ 
  children, 
  loading = false, 
  variant = 'contained', 
  color = 'primary',
  startIcon,
  endIcon,
  onClick,
  disabled,
  fullWidth = false,
  size = 'medium',
  type = 'button',
  ...props 
}) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      startIcon={loading ? <CircularProgress size={20} /> : startIcon}
      endIcon={endIcon}
      onClick={onClick}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      size={size}
      type={type}
      {...props}
    >
      {loading ? 'Cargando...' : children}
    </MuiButton>
  );
};

export default Button;