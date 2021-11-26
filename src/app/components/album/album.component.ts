import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';

const GET_ALBUMS = gql`
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

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit, OnDestroy {
  data = {
    id: '1',
    title: 'quidem molestiae enim',
    photos: {
      data: [
        {
          title: 'accusamus beatae ad facilis cum similique qui sunt',
          url: 'https://via.placeholder.com/600/92c952',
        },
        {
          title: 'reprehenderit est deserunt velit ipsam',
          url: 'https://via.placeholder.com/600/771796',
        },
        {
          title: 'officia porro iure quia iusto qui ipsa ut modi',
          url: 'https://via.placeholder.com/600/24f355',
        },
        {
          title: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
          url: 'https://via.placeholder.com/600/d32776',
        },
        {
          title: 'natus nisi omnis corporis facere molestiae rerum in',
          url: 'https://via.placeholder.com/600/f66b97',
        },
        {
          title: 'accusamus ea aliquid et amet sequi nemo',
          url: 'https://via.placeholder.com/600/56a8c2',
        },
        {
          title:
            'officia delectus consequatur vero aut veniam explicabo molestias',
          url: 'https://via.placeholder.com/600/b0f7cc',
        },
      ],
    },
  };

  loading = true;
  albums: any;
  totalItems: number | undefined;
  page = 1;
  limit = 6;

  private querySubscription: Subscription | undefined;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.getAlbums();
  }

  ngOnDestroy() {
    if (this.querySubscription) this.querySubscription.unsubscribe();
  }

  handlePageChange(event: any): void {
    this.page = event;
    this.getAlbums();
  }

  getAlbums() {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: GET_ALBUMS,
        variables: {
          options: {
            paginate: {
              page: this.page,
              limit: this.limit,
            },
          },
        },
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.albums = data.albums.data;
        this.totalItems = data.albums.meta.totalCount;
      });
  }
}
