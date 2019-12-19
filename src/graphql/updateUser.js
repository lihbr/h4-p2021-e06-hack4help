import gql from "graphql-tag";

export const UpdateUserMutation = gql`
  mutation UpdateUserMutation($userId: String!, $data: UpdateUserInput!) {
    updateUser(id: $userId, data: $data) {
      id
    }
  }
`;
