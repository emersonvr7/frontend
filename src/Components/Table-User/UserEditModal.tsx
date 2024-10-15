import * as React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER } from '../../Schema/Querys/GetUser';
import { UPDATE_USER } from '../../Schema/Mutations/User/UpdateUser';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserEditModalProps } from '../../Typings/UserEditModald';

// Define la interfaz para el usuario
interface User {
  id: string;
  name: string;
  username: string;
}

// Define la interfaz para la respuesta de la consulta
interface GetUserResponse {
  getUser: User;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UserEditModal: React.FC<UserEditModalProps> = ({ open, onClose, userId, onUserUpdated }) => {
  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');

  const { data, loading, error } = useQuery<GetUserResponse>(GET_USER, {
    variables: { id: userId },
    skip: !open,
    onCompleted: (data) => {
      console.log('User data:', data);
      if (data && data.getUser) {
        setName(data.getUser.name);
        setUsername(data.getUser.username);
      }
    },  
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    update(cache, { data: { updateUser } }) {
      if (updateUser.success) {
        // Aquí especificamos que el tipo de la consulta es GetUserResponse
        const { getUser } = cache.readQuery<GetUserResponse>({
          query: GET_USER,
          variables: { id: userId },
        }) || { getUser: null }; // Asegúrate de manejar el caso donde getUser es null

        if (getUser) {
          cache.writeQuery({
            query: GET_USER,
            variables: { id: userId },
            data: { getUser: { ...getUser, name, username } },
          });
        }
      }
    },
  });

  const handleSubmit = async () => {
    try {
      const { data } = await updateUser({
        variables: {
          id: userId,
          entrada: {
            name,
            username,
            oldPassword,
            newPassword,
          },
        },
      });
      console.log('Update user response:', data);

      if (data.updateUser.success) {
        toast.success('Usuario actualizado correctamente', {
          position: 'bottom-right',
          autoClose: 5000,
        });
        onUserUpdated();
        onClose();
      } else {
        toast.error(data.updateUser.message || 'Error desconocido al actualizar el usuario', {
          position: 'bottom-right',
          autoClose: 5000,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('Error al actualizar el usuario', {
        position: 'bottom-right',
        autoClose: 5000,
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-user-modal-title"
      aria-describedby="edit-user-modal-description"
    >
      <Box sx={style}>
        <Typography id="edit-user-modal-title" variant="h6" component="h2">
          Editar Usuario
        </Typography>
        <TextField
          margin="dense"
          label="Nombre"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Nombre de Usuario"
          type="text"
          fullWidth
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Contraseña Actual"
          type="password"
          fullWidth
          variant="outlined"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Nueva Contraseña"
          type="password"
          fullWidth
          variant="outlined"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button onClick={handleSubmit} fullWidth variant="contained" sx={{ mt: 2 }}>
          Actualizar
        </Button>
      </Box>
    </Modal>
  );
};

export default UserEditModal;
