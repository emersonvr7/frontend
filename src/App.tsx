import React, { useState } from 'react';
import ListarUsers from './Components/Table-User/ListarUsers';
import ListarVentas from './Components/Table-Ventas/ListarVentas'; 
import VentaDetalles from './Components/Detalle-Venta/VentaDetalles'; // Asegúrate de importar tu componente de detalles
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppBar, Toolbar, Button, Box } from '@mui/material'; 
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Importa Router y Routes

function App() {
  return (
    <Router>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            {/* Links para cambiar entre Usuarios y Ventas */}
            <Button color="inherit" component={Link} to="/usuarios">
              Usuarios!
            </Button>
            <Button color="inherit" component={Link} to="/ventas">
              Ventas!
            </Button>
          </Toolbar>
        </AppBar>

        <Box sx={{ padding: 3 }}>
          {/* Aquí se definen las rutas de la app */}
          <Routes>
            <Route path="/usuarios" element={<ListarUsers />} />
            <Route path="/ventas" element={<ListarVentas />} />
            <Route path="/venta/:ventaId" element={<VentaDetalles />} />
          </Routes>
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
    </Router>
  );
}

export default App;
