import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://backend-b6yt.onrender.com/graphql',  // Cambia esto si tu backend está en otro puerto o dominio
  cache: new InMemoryCache(),
});

export default client;
