import gql from "graphql-tag";

export const LoginQuery = gql`
  query LoginQuery($email: String!, $password: String!) {
    login(mail: $email, password: $password) {
      token
      user {
        id
        firstName
        lastName
        mail
        lastLogin
        group
        mailBox {
          id
        }
        document {
          file
          name
        }
      }
    }
  }
`;
