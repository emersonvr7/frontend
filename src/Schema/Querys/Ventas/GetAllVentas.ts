// src/Schema/Querys/GetAllVentas.ts
import { gql } from '@apollo/client';

// Consulta para obtener todas las ventas
export const GET_ALL_VENTAS = gql`
  query GetAllVentas {
    getAllVentas {
      id
      producto
      precio
      cantidad
      fecha
      user {
        id
        name
      }
    }
  }
`;
