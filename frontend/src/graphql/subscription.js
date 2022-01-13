import { gql } from '@apollo/client';

const MESSAGE_SUBSCRIPTION = gql`
  subscription message ($from: String!, $to: String!){
      message (from: $from, to: $to) {
        mutation
        message {
            sender {
                name
            }
            body
        }
      }
    }
`;
//
const NOTIFICATION_SUBSCRIPTION = gql`
  subscription like($email: String!) {
    notification(email: $email) {
        name
        image
      }
    }
`;

const CHAT_SUBSCRIPTION = gql`
  subscription chatBox($email: String!) {
    chatBoxPayload(email: $email) {
      name
      friendName
      friendImage
      freindEmail
    }
  }
`

export {MESSAGE_SUBSCRIPTION, NOTIFICATION_SUBSCRIPTION, CHAT_SUBSCRIPTION};
