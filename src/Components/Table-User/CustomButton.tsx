// src/components/CustomButton.tsx
import React from 'react';
import { Button } from '@mui/material';
import { ButtonProps } from '../../Typings/Button';

const CustomButton: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      {label}
    </Button>
  );
};

export default CustomButton;
