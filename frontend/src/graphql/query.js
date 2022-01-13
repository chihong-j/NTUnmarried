import { gql } from '@apollo/client';

const CHATBOX_QUERY = gql`
  query chatBox($name: String) {
      chatBox(name: $name) {
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
    notificationList
    chatBoxList
  }
}
`

const STRANGER_QUERY = gql`
  query stranger{
    stranger {
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
