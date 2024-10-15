import { gql } from "@apollo/client"; 

export const CREATE_VENTA = gql`
   mutation CreateVenta($user: ID!, $producto: String!, $precio: Float!, $cantidad: Int!, $fecha: String! ) {
    createVenta(user: $user, producto: $producto, precio: $precio, cantidad: $cantidad, fecha: $fecha) {
        id
        producto
        precio
        cantidad    
        fecha
    }
}

`