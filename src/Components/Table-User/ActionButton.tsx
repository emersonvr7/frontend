// src/components/ActionButton.tsx
import React from 'react';
import { Button } from '@mui/material';
import { ButtonProps } from '../../Typings/Button';

const ActionButton: React.FC<ButtonProps> = ({ label, onClick, icon }) => {
  return (
    <Button variant="outlined" color="secondary" onClick={onClick} startIcon={icon}>
      {label}
    </Button>
  );
};

export default ActionButton;
