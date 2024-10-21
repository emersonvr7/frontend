import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, CircularProgress, Grid } from '@mui/material';
import { useParams } from 'react-router-dom'; // Importa el hook useParams

interface Venta {
    producto: string;
    precio: number;
    cantidad: number;
    fecha: string;
    usuario: string;
}

const VentaDetalles: React.FC = () => {
    // Usamos useParams para obtener el parámetro de la URL
    const { ventaId } = useParams<{ ventaId: string }>();
    
    const [venta, setVenta] = useState<Venta | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVenta = async () => {
            try {
                const response = await axios.get<Venta>(`http://localhost:3002/factura/${ventaId}`);
                setVenta(response.data);
            } catch (err) {
                setError('Error al obtener los detalles de la venta');
            } finally {
                setLoading(false);
            }
        };

        fetchVenta();
    }, [ventaId]);

    if (loading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Paper elevation={3} sx={{ padding: '2rem', marginTop: '2rem' }}>
                <Typography variant="h4" gutterBottom>
                    ¡Hola! Su compra es la siguiente:
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Producto:</Typography>
                        <Typography>{venta?.producto}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Precio:</Typography>
                        <Typography>${venta?.precio}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Cantidad:</Typography>
                        <Typography>{venta?.cantidad}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Fecha de compra:</Typography>
                        <Typography>{venta?.fecha}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Comprado por:</Typography>
                        <Typography>{venta?.usuario}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default VentaDetalles;
