import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',  // Cambia esto si tu backend está en otro puerto o dominio
  cache: new InMemoryCache(),
});

export default client;
