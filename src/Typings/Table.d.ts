// src/Typings/Table.d.ts
export interface User {
  id: string;
  name: string;
  username: string;
}

export interface Venta {
  id: string;
  producto: string;
  precio: number;
  cantidad: number;
  fecha: string;
  user: User; // Relación con el usuario
}

export interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
}
