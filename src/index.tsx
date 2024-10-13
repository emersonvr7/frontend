import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import App from './App';

// Configura el cliente Apollo para conectarse a tu API GraphQL
const client = new ApolloClient({
  uri: 'http://localhost:3002/graphql',  // Cambia a la URL de tu API GraphQL
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
