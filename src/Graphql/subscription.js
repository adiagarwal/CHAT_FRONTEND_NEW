import {gql} from "@apollo/client";

export const SUBSCRIBE_NEW_CONVERSATION = gql`
subscription Subscription($userId: String) {
    conversationCreated(user_id: $userId)
}
`

export const PUBLISH_MESSAGE=gql`
subscription Subscription {
    publishMessage
  }
`