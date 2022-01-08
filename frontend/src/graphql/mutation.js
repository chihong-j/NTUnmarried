import { gql } from '@apollo/client';

const CREATE_CHATBOX_MUTATION = gql`
  mutation createChatBox($name1: String!, $name2: String!) {
    createChatBox(name1: $name1, name2: $name2) {
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

const UPDATE_USER_MUTATION = gql`

  mutation updateUser($email: String!, $gender: Boolean, $age: Int, $aboutMe: String, $interest: String, $department: String, $birth: Birth!){
    updateUser(email: $email, gender: $gender, age: $age, aboutMe: $aboutMe, interest: $interest, department: $department, birth: $birth) {
      email
    }
  }
`

const UPLOADFILE_MUTATION = gql`

  mutation uploadFile($file: Upload!, $userEmail: String!) {
    uploadFile(file: $file, userEmail: $userEmail)
  }
`

const SIGNUP_MUTATION = gql`

  mutation signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $passward, name: $name) {
      name
    }
  }
`

const LOGIN_MUTATION = gql`

  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password){
      token
    }
  }
`

export {CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION, UPDATE_USER_MUTATION, UPLOADFILE_MUTATION, SIGNUP_MUTATION, LOGIN_MUTATION};
