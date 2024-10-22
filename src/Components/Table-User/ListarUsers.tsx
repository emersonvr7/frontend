import React, { useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableHead from '@mui/material/TableHead';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { GET_ALL_USERS } from '../../Schema/Querys/GetAllUSers';
import { DELETE_USER } from '../../Schema/Mutations/User/DeleteUser';
import { User } from '../../Typings/Table';
import TablePaginationActions from './TablePaginationActions';
import UserDialog from './UserDialog';
import UserEditModal from './UserEditModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Typography } from '@mui/material';
import { Bolt } from '@mui/icons-material';
import dayjs from 'dayjs';



const ListarUsers: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  const [deleteUser] = useMutation(DELETE_USER)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [openRows, setOpenRows] = useState<{ [key: string]: boolean }>({});

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);


  const handleOpenEditModal = (id: string) => {
    setSelectedUserId(id);
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => {
    setSelectedUserId(null);
    setOpenEditModal(false);
  };

  const handleUserUpdated = () => {
    toast.success('Usuario actualizado correctamente');
    setOpenEditModal(false);
  };

  const toggleRow = (userId: string) => {
    setOpenRows((prevOpenRows) => ({
      ...prevOpenRows,
      [userId]: !prevOpenRows[userId],
    }));
  }

  const fechaf = dayjs().format("DD/MM/YYYY HH:mm:ss")

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const users: User[] = data.getAllUsers;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  const showSuccess = () => {
    toast.success('Usuario Creado! El usuario ha sido creado correctamente.', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // Función para eliminar un usuario
  const handleDeleteUser = async (id: string) => {
    try {
      const { data } = await deleteUser({
        variables: { id },
        refetchQueries: [{ query: GET_ALL_USERS }],
      });

      if (data.deleteUser) {
        toast.success('Usuario eliminado correctamente', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error(`Error al eliminar usuario: ${error}`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };






  return (
    <>
      <TableContainer component={Paper}>
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          New User
        </Button>
        <UserDialog open={openDialog} onClose={handleCloseDialog} onUserCreated={showSuccess} />
        {selectedUserId && (
          <UserEditModal
            open={openEditModal}
            onClose={handleCloseEditModal}
            userId={selectedUserId}
            onUserUpdated={handleUserUpdated}
          />
        )}

        <Table arial-label="collapsible table">
          <TableBody>
            <TableHead>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Actions</TableCell>
            </TableHead>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <React.Fragment key={user.id}>
                <TableRow>
                  <TableCell>
                    <IconButton
                      arial-label="expand row"
                      size="small"
                      onClick={() => toggleRow(user.id)}
                    >
                      {openRows[user.id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}

                    </IconButton>
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenEditModal(user.id)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteUser(user.id)}
                      style={{ marginLeft: '10px' }}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 9, paddingTop: 0 }} colSpan={6} >
                    <Collapse in={openRows[user.id]} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <Typography variant="h6" gutterBottom component="div" style={{fontFamily: 'revert'}}>
                          Detalles
                        </Typography>
                        <Table size='small' arial-label='purchases'>


                          <TableHead>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Fecha de cracion</TableCell>
                          </TableHead>

                          <TableBody />
                 
                    <TableRow key={user.id}>
                      <TableCell component="th" scope="row">
                        {user.name}
                      </TableCell>
                      <TableCell>{user.createAt}</TableCell>
                      </TableRow>
                        </Table>
                      </Box>




                    </Collapse>
                  </TableCell>
                </TableRow>

              </React.Fragment>



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
                colSpan={3}
                count={users.length}
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

export default ListarUsers;
