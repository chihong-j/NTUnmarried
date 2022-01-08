import { gql } from '@apollo/client';

const CREATE_CHATBOX_MUTATION = gql`
  mutation createChatBox($email1: String!, $email2: String!) {
    createChatBox(email1: $email1, email2: $email2) {
      name
      messages {
        sender {
          name
        }
        body
      }
    }
  }
`;

const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage($from: String!, $to: String!, $message: String!) {
    createMessage(from: $from, to: $to, message: $message) {
      sender {
        name
      }
      body
    }
  }
`;

const CREATE_LIKE_MUTATION = gql`
  mutation createLike($from: String!, $to: String!) {
    createLike(from: $from, to: $to) {
      name
      email
    }
  }
`;

export {CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION, CREATE_LIKE_MUTATION};
