import gql from "graphql-tag";

export const MailBoxQuery = gql`
  query MailBoxQuery($id: String!) {
    mailBox(id: $id) {
      pending
      status
      recipient {
        id
        firstName
        lastName
        lastLogin
        mail
        document {
          name
          file
        }
      }
      address {
        street
        city
        zip
      }
    }
  }
`;
