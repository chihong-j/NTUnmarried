import { gql } from '@apollo/client';

const CHATBOX_QUERY = gql`
  query chatBox($name1: String, $name2: String) {
      chatBox(name1: $name1, name2: $name2) {
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
//
const USER_QUERY = gql`
query user($email: String!){
  user(email: $email) {
    email
    name
    gender
    age
    aboutMe
    department
    images
    pairedEmail
    pairedName
  }
}
`

const STRANGER_QUERY = gql`
  query stranger($email: String!){
    stranger(email: $email) {
      name
      age
      aboutMe
      department
      images
      email
    }
  }
`

export {CHATBOX_QUERY, USER_QUERY, STRANGER_QUERY}
