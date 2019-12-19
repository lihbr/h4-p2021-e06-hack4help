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
      document {
        file
        name
      }
    }
  }
`;
