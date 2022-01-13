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
        email
        images
      }
    }
`;

export {MESSAGE_SUBSCRIPTION, NOTIFICATION_SUBSCRIPTION};
