import * as React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_VENTA } from '../../Schema/Mutations/Ventas/CreateVenta';
import { GET_ALL_VENTAS } from '../../Schema/Querys/Ventas/GetAllVentas';
import { GET_ALL_USERS } from '../../Schema/Querys/Ventas/getuserVenta';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { TransitionProps } from '@mui/material/transitions';
import { VentaDialogProps } from '../../Typings/Dialog_Sale';
import productosCuero from './Productos';

interface UserType {
    id: string;
    name: string;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const VentaDialog: React.FC<VentaDialogProps> = ({ open, onClose, onVentaCreated }) => {
    const [producto, setProducto] = React.useState('');
    const [precio, setPrecio] = React.useState('');
    const [cantidad, setCantidad] = React.useState('');
    const [user, setUser] = React.useState<string>('');
    const [qrCodeUrl, setQrCodeUrl] = React.useState<string>(''); // Estado para almacenar la URL del QR

    const { data: usersData, loading: loadingUsers } = useQuery(GET_ALL_USERS);

    const [createVenta, { loading, error }] = useMutation(CREATE_VENTA);

    const [fecha, setFecha] = React.useState(new Date().toISOString().slice(0, 10)); // Fecha actual por defecto

    const [facturaUrl, setFacturaUrl] = React.useState<string>(''); // Estado para almacenar la URL de la factura


    const handleSubmit = async () => {
        try {
            const { data } = await createVenta({
                variables: {
                    user,
                    producto,
                    precio: parseFloat(precio),
                    cantidad: parseInt(cantidad, 10),
                    fecha,
                },
                update: (cache, { data: { createVenta } }) => {
                    const { getAllVentas }: any = cache.readQuery({ query: GET_ALL_VENTAS }) || { getAllVentas: [] };
                    cache.writeQuery({
                        query: GET_ALL_VENTAS,
                        data: { getAllVentas: [...getAllVentas, createVenta] },
                    });
                }
            });

            // Generar el QR usando la nueva venta creada
            const qrResponse = await fetch(`http://localhost:3002/generar-qr/${data.createVenta.id}`);
            const qrData = await qrResponse.text();
            // Puedes extraer solo la parte de la imagen QR del HTML devuelto
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(qrData, 'text/html');
            const imgElement = htmlDocument.querySelector('img');
            if (imgElement) {
                setQrCodeUrl(imgElement.src);
            }

            // Asignar la URL de la factura
            setFacturaUrl(`http://localhost:3002/factura?id=${data.createVenta.id}`);

            setProducto('');
            setPrecio('');
            setCantidad('');
            setUser('');
            setFecha(new Date().toISOString().slice(0, 10));
            onVentaCreated();
            onClose();
        } catch (err) {
            console.error(err);
        }
    };


    const handleCloseQrDialog = () => {
        setQrCodeUrl(''); // Resetea el QR al cerrar el diálogo
        onClose();
    };

    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={onClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Create New Sale"}</DialogTitle>
                <DialogContent sx={{ marginBottom: 2 }}>
                    <DialogContentText id="alert-dialog-slide-description" sx={{ marginBottom: 3 }}>
                        Escribe los detalles de la nueva venta
                    </DialogContentText>
                    <Autocomplete
                        disablePortal
                        options={usersData?.getAllUsers || []}
                        getOptionLabel={(option: UserType) => option.name}
                        loading={loadingUsers}
                        sx={{ width: '100%', marginBottom: 1 }}
                        renderInput={(params) => <TextField {...params} label="Usuario" variant="outlined" />}
                        onChange={(e, value) => setUser(value?.id || '')}
                    />

                    <Autocomplete
                        disablePortal
                        options={productosCuero}
                        getOptionLabel={(option) => option.label}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField {...params} label="Producto" variant="outlined" />}
                        onChange={(e, value) => setProducto(value?.label || '')}
                    />
                    <TextField
                        margin="dense"
                        id="precio"
                        label="Precio"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="cantidad"
                        label="Cantidad"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="fecha"
                        label="Fecha"
                        type="date"
                        fullWidth
                        variant="outlined"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button onClick={handleSubmit}>Crear</Button>
                </DialogActions>
            </Dialog>
            {qrCodeUrl && (
                <Dialog
                    open={!!qrCodeUrl}
                    onClose={handleCloseQrDialog}
                >
                    <DialogTitle>QR Generado</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Escanea el siguiente código QR para ver los detalles de la venta:
                        </DialogContentText>
                        {qrCodeUrl && <img src={qrCodeUrl} alt="Código QR" />}
                        {facturaUrl && (
                            <a href={facturaUrl} target="_blank" rel="noopener noreferrer">
                                <Button variant="contained" color="primary">
                                    Ver Factura
                                </Button>
                            </a>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseQrDialog}>Cerrar</Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};

export default VentaDialog;