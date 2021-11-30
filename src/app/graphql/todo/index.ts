import { gql } from 'apollo-angular';

export const GET_TODOS = gql`
  query TodoQuery($options: PageQueryOptions) {
    todos(options: $options) {
      data {
        id
        title
        completed
        user {
          name
        }
      }
      meta {
        totalCount
      }
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodoMutation($id: ID!) {
    deleteTodo(id: $id)
  }
`;

export const COMPLETE_TODO = gql`
  mutation CompleteTodoMutation($id: ID!, $input: UpdateTodoInput!) {
    updateTodo(id: $id, input: $input) {
      id
      completed
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodoMutation($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      title
      completed
    }
  }
`;
