import gql from "graphql-tag";

export const MeQuery = gql`
  {
    me {
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
`;
