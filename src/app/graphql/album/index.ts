import { gql } from 'apollo-angular';

export const GET_ALBUMS = gql`
  query AlbumQuery($options: PageQueryOptions) {
    albums(options: $options) {
      data {
        id
        title
        photos {
          data {
            title
            url
          }
        }
      }
      meta {
        totalCount
      }
    }
  }
`;
