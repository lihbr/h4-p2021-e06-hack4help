import gql from "graphql-tag";

export const UpdateMailBoxMutation = gql`
  mutation UpdateMailBoxMutation($id: String!, $data: UpdateMailBoxInput!) {
    updateMailBox(id: $id, data: $data) {
      id
    }
  }
`;
