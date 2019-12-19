import gql from "graphql-tag";

export const CreateMailBoxMutation = gql`
  mutation CreateMailBoxMutation($data: CreateMailBoxInput!) {
    createMailBox(data: $data) {
      id
    }
  }
`;
