// src/Typings/Table.d.ts
export interface User {
    id: string;
    name: string;
    username: string;
  }
  
  export interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement>,
      newPage: number,
    ) => void;
  }
  