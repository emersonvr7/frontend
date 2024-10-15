import { gql } from '@apollo/client'

export const UPDATE_USER = gql`
    mutation UpdateUser($id: ID!, $name: String!, $username: String!, $oldPassword: String!, $newPassword: String!) {
        updateUser(
            id: $id
            entrada: { name: $name, username: $username, oldPassword: $oldPassword, newPassword: $newPassword }
        ){
            success
            message
        }
    }
`;
