import {ApolloClient  , InMemoryCache , createHttpLink , split } from "@apollo/client";
import {REACT_APP_CHAT_BACKEND_URL} from "../Constants/constant";
import {wsLink } from "./websocket";
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from "@apollo/client/link/context";
import jwt_decode from "jwt-decode";

 const backendLink = createHttpLink({
    uri : `${REACT_APP_CHAT_BACKEND_URL}`,
    headers:{
      authorization : localStorage.getItem('accessToken')
    }
})

const authLink = createHttpLink({
  uri : "http://localhost:5000/graphql",
  headers:{
    authorization : localStorage.getItem('accessToken')
  }
})

// const bridgeLink = setContext(({_ , headers}) =>{
//   let token = localStorage.getItem('accessToken')
//   console.log(token)
//   return {
//     headers: {
//       ...headers,
//       authorization: token 
//     }
//   }
// })

// const mainLink = bridgeLink.concat(backendLink)

const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    backendLink,
  );


export const client = new ApolloClient({
    link : splitLink,
    cache : new InMemoryCache()
})

export const authclient = new ApolloClient({
  link : authLink,
  cache : new InMemoryCache()
})