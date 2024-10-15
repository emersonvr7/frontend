// src/Typings/Dialog.ts
export interface UserDialogProps {
    open: boolean;
    onClose: () => void;
    onUserCreated: () => void; // Agregar esta línea
  }
  