import ApolloClient from 'apollo-boost';
import { defaults,resolvers } from './LocalState';

export const APOLLO_URI =process.env.NODE_ENV=== "development" ?"http://localhost:4000":"https://clonegram-backend.herokuapp.com"

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