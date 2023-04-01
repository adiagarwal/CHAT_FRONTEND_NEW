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



const authLink = setContext(async() =>{
  let token = localStorage.getItem('accessToken')
  let decode = jwt_decode(token)
  console.log(decode)
})

const mainLink = backendLink.concat(authLink)

const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    mainLink,
  );


export const client = new ApolloClient({
    link : splitLink,
    cache : new InMemoryCache()
})

export const onboardingClient = new ApolloClient({
  uri : `${REACT_APP_CHAT_BACKEND_URL}`,
  cache : new InMemoryCache()
})
