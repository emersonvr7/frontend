import React, { useState } from 'react';
import ListarUsers from './Components/Table-User/ListarUsers';
import ListarVentas from './Components/Table-Ventas/ListarVentas'; // Importar el componente de ventas
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppBar, Toolbar, Button, Box } from '@mui/material'; // Material UI para el Navbar

function App() {
  // Estado para manejar la vista activa
  const [activeView, setActiveView] = useState('usuarios');

  // Función para cambiar de vista
  const handleViewChange = (view: string) => {
    setActiveView(view);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          {/* Botones para cambiar entre Usuarios y Ventas */}
          <Button color="inherit" onClick={() => handleViewChange('usuarios')}>
            Usuarios
          </Button>
          <Button color="inherit" onClick={() => handleViewChange('ventas')}>
            Ventas
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 3 }}>
        {/* Renderizar la vista según el estado activo */}
        {activeView === 'usuarios' && (
          <>
            <h1>Gestión de Usuarios</h1>
            <ListarUsers />
          </>
        )}
        {activeView === 'ventas' && (
          <>
            <h1>Gestión de Ventas</h1>
            <ListarVentas />
          </>
        )}
      </Box>

      {/* Contenedor para las notificaciones */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
