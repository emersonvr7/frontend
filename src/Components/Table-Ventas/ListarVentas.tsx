// src/Components/ListarVentas.tsx
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';  
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { GET_ALL_VENTAS } from '../../Schema/Querys/Ventas/GetAllVentas';
import { Venta } from '../../Typings/Table';
import TablePaginationActions from '../Table-User/TablePaginationActions'; 
import VentaDialog from './VentaDialog';
import { toast } from 'react-toastify';
import { TableHead } from '@mui/material';


const ListarVentas: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_VENTAS);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () =>setOpenDialog(false);


  const ShowSuccess = () =>{
    toast.success('Venta Creada Correctamente.', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const ventas: Venta[] = data.getAllVentas;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ventas.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
    <Button sx={{ marginBottom: 2}} variant='contained' color= "primary" onClick={handleOpenDialog}>
          New Venta
        </Button>
      <TableContainer component={Paper}>
        <VentaDialog open={openDialog} onClose={handleCloseDialog} onVentaCreated={ShowSuccess}/>
        <Table>
          <TableHead>
            <TableCell>Producto</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Usuario</TableCell>
          </TableHead>
          <TableBody>
            {ventas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((venta) => (
              <TableRow key={venta.id}>
                <TableCell>{venta.producto}</TableCell>
                <TableCell>{venta.precio}</TableCell>
                <TableCell>{venta.cantidad}</TableCell>
                <TableCell>{new Date(venta.fecha).toLocaleDateString()}</TableCell>
                <TableCell>{venta.user.name}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={5}
                count={ventas.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListarVentas;
