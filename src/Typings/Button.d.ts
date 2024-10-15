// src/typings/Button.d.ts
import { ReactNode } from 'react';


export interface ButtonProps {
    label: string;
    onClick: () => void;
    icon?: ReactNode; // Añadir prop para ícono

  }
  