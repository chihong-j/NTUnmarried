# Backend

### package version
- **node** v12.22.8
- **graphql-upload** v13.0.0
- **graphql-yoga** v1.17.4
- **mongoose** v6.1.3
- **mongoose-gridfs** v1.3.0

### run
```shell
yarn start
```

### Query
```graphql
type Query {
    user(id: ID!): User!
}
```
### Mutation
```graphql
type Mutation {
    createUser(name: String!, gender: Boolean!, age: Int!): User!
    uploadFile(file: Upload!, userId: ID!): String!
}
```

### User
```graphql
type User {
    id: ID!,
    name: String!,
    gender: Boolean!,
    age: Int!
    images: [String!]
}
```

## To Frontend:

### Package Required (Maybe)

- **@apollo/client**
- **@apollo/react-hooks**
- **apollo-link-ws**
- **apollo-upload-client**
- **apollo-link**
- **apollo-utilities**
- **graphql**
- **react-apollo**

### In graphql/mutations.js
```js
export const UPLOAD_FILE_MUTATION = gql`
    mutation ($file: Upload!, $userId: ID!) {
        uploadFile(file: $file, userId: $userId)
    }
`;

export const CREATE_USER_MUTATION = gql`
    mutation ($name: String!, $gender: Boolean!, age: Int!) {
        createUser(name: $name, gender: $gender, age: $age) {
            id
            name
            gender
            age
        }
    }
`;
    
```

### In graphql/queries.js
```js
export const USER_QUERY = gql`
    query user($id: ID!){
        user(id: $id) {
            id
            name
            gender
            age
            images
        }
    }
`;
```

### Usage of uploadFile
```js
import { useMutation } from '@apollo/react-hooks';
export { UPLOAD_FILE_MUTATION } from './graphql/mutations';
const [uploadFile, { data }] = useMutation(UPLOAD_FILE_MUTATION);

return (
    <>
        <input
            type="file"
            required
            onChange={({target: {validity, files: [file]}}) =>{
                validity.valid && uploadFile({variables: {file, userId: "61d168a366d6e3698e0a62bb"}})
            }}
        />
        <img src={data.uploadFile}/>    
    </>
)
```







