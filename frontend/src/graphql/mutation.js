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
  mutation createLike($to: String!, $isLike: Boolean!) {
    createLike(to: $to, isLike: $isLike) {
        email
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation updateUser($email: String!, $gender: Boolean, $age: Int, $aboutMe: String, $department: String){
    updateUser(email: $email, gender: $gender, age: $age, aboutMe: $aboutMe, department: $department) {
      email
    }
  }
`

const UPLOADFILE_MUTATION = gql`

  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`

const SIGNUP_MUTATION = gql`

  mutation signup($email: String!, $password: String!, $name: String!, $gender: Boolean!, $age: Int!, $aboutMe: String!, $department: String!) {
    signup(email: $email, password: $password, name: $name, gender: $gender, age: $age, aboutMe: $aboutMe, department: $department) {
      name
    }
  }
`
//
const LOGIN_MUTATION = gql`

  mutation login($email: String!) {
    login(email: $email){
      password,
      token
    }
  }
`

export {CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION, UPDATE_USER_MUTATION, UPLOADFILE_MUTATION, SIGNUP_MUTATION, LOGIN_MUTATION, CREATE_LIKE_MUTATION};
