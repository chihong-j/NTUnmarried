import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink } from '@apollo/client';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
const uploadLink = createUploadLink({
    uri: 'http://localhost:5000'
});
//
// Create a WebSocket link:
const wsLink = new WebSocketLink({
    uri: `ws://localhost:5000/`,
    options: { reconnect: true },
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
    // split based on operation type
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    uploadLink,
);

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? token : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache().restore({}),
});


ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);


