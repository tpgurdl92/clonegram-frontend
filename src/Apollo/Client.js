//import ApolloClient from 'apollo-boost';
import { defaults,resolvers } from './LocalState';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';


export const APOLLO_URI =process.env.NODE_ENV=== "development" ?"http://localhost:4000":"https://clonegram-backend.herokuapp.com";
export const APOLLO_URI_WS =process.env.NODE_ENV=== "development" ?"ws://localhost:4000":"wss://clonegram-backend.herokuapp.com";

// Create an http link:
const httpLink = new HttpLink({
    uri: APOLLO_URI,
    headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`
    }
  });
  
  // Create a WebSocket link:
  const wsLink = new WebSocketLink({
    uri: APOLLO_URI_WS,
    headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`
    },
    options: {
      reconnect: true,
      //20200706 park add start
      connectionParams:{
          Authorization:`${localStorage.getItem("token")}`
      }
      //20200706 park add end
    }
  });

  const cache =new InMemoryCache();
const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
            );
            if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
    split(
        // split based on operation type
        ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
        },
        wsLink,
        httpLink,
        ),
    withClientState({
        defaults,
        cache
      }),
    ]),
    resolvers,
  cache
  
});

export default client;

/*

const cliesnt = new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          sendToLoggingService(graphQLErrors);
        }
        if (networkError) {
          logoutUser();
        }
      }),
      requestLink,
      withClientState({
        defaults: {
          isConnected: true
        },
        resolvers: {
          Mutation: {
            updateNetworkStatus: (_, { isConnected }, { cache }) => {
              cache.writeData({ data: { isConnected }});
              return null;
            }
          }
        },
        cache
      }),
      new HttpLink({
        uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql',
        credentials: 'include'
      })
    ]),
    cache
  });

*/
/*
export default new ApolloClient({
    uri: APOLLO_URI,
    clientState:{
        defaults,
        resolvers
    },
    headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`
    }
});
*/