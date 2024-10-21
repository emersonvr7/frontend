import React, { useState } from 'react';
import ListarUsers from './Components/Table-User/ListarUsers';
import ListarVentas from './Components/Table-Ventas/ListarVentas'; 
import VentaDetalles from './Components/Detalle-Venta/VentaDetalles'; // Asegúrate de importar tu componente de detalles
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppBar, Toolbar, Button, Box } from '@mui/material'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa Router y Routes

function App() {
  // Estado para manejar la vista activa
  const [activeView, setActiveView] = useState('usuarios');

  // Función para cambiar de vista
  const handleViewChange = (view: string) => {
    setActiveView(view);
  };

  return (
    <Router>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            {/* Botones para cambiar entre Usuarios y Ventas */}
            <Button color="inherit" onClick={() => handleViewChange('usuarios')}>
              Usuarios!
            </Button>
            <Button color="inherit" onClick={() => handleViewChange('ventas')}>
              Ventas!
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

        {/* Aquí se definen las rutas de la app */}
        <Routes>
          {/* Otras rutas pueden ir aquí */}
          <Route path="/venta/:ventaId" element={<VentaDetalles />} />
        </Routes>

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
    </Router>
  );
}

export default App;
