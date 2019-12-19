import gql from "graphql-tag";

export const MailBoxesQuery = gql`
  {
    mailBoxes {
      id
      pending
      status
      recipient {
        firstName
        lastName
        lastLogin
      }
    }
  }
`;
