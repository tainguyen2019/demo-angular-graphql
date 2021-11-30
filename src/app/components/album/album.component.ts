import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';

import { GET_ALBUMS } from 'src/app/graphql/album';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit, OnDestroy {
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
