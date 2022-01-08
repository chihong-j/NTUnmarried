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

const LIKE_SUBSCRIPTION = gql`
  subscription like ($from: String!, $to: String!){
      like (from: $from, to: $to) {
        mutation
        name
        email
      }
    }
`;

export {MESSAGE_SUBSCRIPTION, LIKE_SUBSCRIPTION};