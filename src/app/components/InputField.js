import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';

const InputField = ({
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  helperText,
  disabled = false,
  fullWidth = true,
  required = false,
  placeholder,
  startIcon,
  endIcon,
  onEndIconClick,
  multiline = false,
  rows = 1,
  ...props
}) => {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      disabled={disabled}
      fullWidth={fullWidth}
      required={required}
      placeholder={placeholder}
      multiline={multiline}
      rows={multiline ? rows : undefined}
      InputProps={{
        startAdornment: startIcon && (
          <InputAdornment position="start">
            {startIcon}
          </InputAdornment>
        ),
        endAdornment: endIcon && (
          <InputAdornment position="end">
            {onEndIconClick ? (
              <IconButton onClick={onEndIconClick} edge="end">
                {endIcon}
              </IconButton>
            ) : (
              endIcon
            )}
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default InputField;