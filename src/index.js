import React from 'react';
import ReactDOM from 'react-dom';
import App from './Component/App';
import { ApolloProvider as ApolloHookProvider} from "react-apollo-hooks";
import { ApolloProvider } from 'react-apollo';
import client from './Apollo/Client';


ReactDOM.render(
  
    <ApolloHookProvider client={client}>
      <App/>
    </ApolloHookProvider>    
  ,
  document.getElementById('root')
);
