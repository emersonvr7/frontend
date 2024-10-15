import * as React from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../Schema/Mutations/User/CreateUser';
import { GET_ALL_USERS } from '../../Schema/Querys/GetAllUSers';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { TransitionProps } from '@mui/material/transitions';
import { UserDialogProps } from '../../Typings/Dialog';
import { GetAllUsersResponse } from '../../Typings/GetAllUsersResponse'; // Asegúrate de definir el tipo

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserDialog: React.FC<UserDialogProps> = ({ open, onClose, onUserCreated }) => {
  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [createUser, { loading, error }] = useMutation(CREATE_USER);

  const handleSubmit = async () => {
    try {
      const { data } = await createUser({
        variables: { name, username, password },
        update: (cache, { data: { createUser } }) => {
          // Especificar el tipo de retorno esperado
          const { getAllUsers }: GetAllUsersResponse = cache.readQuery({ query: GET_ALL_USERS }) || { getAllUsers: [] };

          // Actualizar el cache con el nuevo usuario
          cache.writeQuery({
            query: GET_ALL_USERS,
            data: { getAllUsers: [...getAllUsers, createUser] },
          });
        }
      });
      onUserCreated(); // Llama a onUserCreated después de crear el usuario
      onClose(); // Cierra el diálogo después de crear el usuario
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Create New User"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Enter the details of the new user.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="username"
          label="Username"
          type="text"
          fullWidth
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </Button>
      </DialogActions>
      {error && <p>Error: {error.message}</p>}
    </Dialog>
  );
};

export default UserDialog;
