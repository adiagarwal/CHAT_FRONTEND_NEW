import {gql} from "@apollo/client";

export const SIGNUP = gql`
mutation SignUp($username: String!, $email: String!, $password: String!, $confirmpassword: String!) {
    signUp(username: $username, email: $email, password: $password, confirmpassword: $confirmpassword) {
      status
      msg
      data
    }
  }
`

export const SIGNIN = gql`
mutation Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      status
      msg
      data
    }
  }
`

export const CREATE_USER_CONVERSATION = gql`
mutation CreateUserConversation($createUserConversationId: String!) {
  createUserConversation(id: $createUserConversationId) {
    status
    msg
    data
  }
}
`

export const SEND_NEW_MESSAGE=gql`
mutation SendMessage($conversationId: String, $body: String) {
  sendMessage(conversation_id: $conversationId, body: $body) {
    status
    msg
    data
  }
}
`