import { gql } from '@apollo/client';

// Consulta para obtener todos los usuarios
export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      name
      username
      password
      createAt
      salesCount
      loyaty
    }
  }
`;
