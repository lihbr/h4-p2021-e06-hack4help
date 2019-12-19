import gql from "graphql-tag";

export const MeQuery = gql`
  {
    me {
      id
      firstName
      lastName
      email: mail
      lastLogin
      group
      document {
        file
        name
      }
    }
  }
`;
