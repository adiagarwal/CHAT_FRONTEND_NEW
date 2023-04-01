import {gql} from "@apollo/client";

export const GET_ALL_USERS = gql`
query GetAllUsers {
    getAllUsers {
      status
      msg
      data
    }
  }
`

export const GET_CURRENT_USER = gql`
query GetCurrentUser {
    getCurrentUser {
      status
      msg
      data
    }
  }
`

export const GET_ALL_CONVERSATIONS = gql`
query Query {
  getAllConversationsForUser
}
`

export const GET_MESSAGES_OF_CONVERSATION = gql`
query Query($conversationId: String) {
  getMessagesOfConversations(conversation_id: $conversationId)
}
`