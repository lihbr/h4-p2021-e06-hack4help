import gql from "graphql-tag";

export const DeleteMailBoxMutation = gql`
  mutation DeleteUserMutation($id: String!) {
    deleteMailBox(id: $id) {
      id
    }
  }
`;
