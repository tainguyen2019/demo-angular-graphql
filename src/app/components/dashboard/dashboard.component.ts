import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { GET_DASHBOARD } from 'src/app/graphql/dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  loading = true;
  totalItems: number | undefined;
  page = 1;
  limit = 6;
  dashboardItemsData: any;

  private querySubscription: Subscription | undefined;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.getDashboardData();
  }

  ngOnDestroy() {
    if (this.querySubscription) this.querySubscription.unsubscribe();
  }

  getDashboardData() {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: GET_DASHBOARD,
        variables: {
          options: {
            paginate: {
              page: this.page,
              limit: this.limit,
            },
            sort: [
              {
                field: 'id',
                order: 'DESC',
              },
            ],
          },
        },
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.computeData(data);
      });
  }

  computeData(data: any): any {
    const totalPosts = data.postData.meta.totalCount || 0;
    const totalTodos = data.todoData.meta.totalCount || 0;
    const totalPhotos = data.photoData.meta.totalCount || 0;
    const totalAlbums = data.albumData.meta.totalCount || 0;

    this.dashboardItemsData = [
      {
        name: 'Posts',
        value: totalPosts,
        icon: 'description',
      },
      {
        name: 'Todos',
        value: totalTodos,
        icon: 'task',
      },
      {
        name: 'Photos',
        value: totalPhotos,
        icon: 'photo',
      },
      {
        name: 'Albums',
        value: totalAlbums,
        icon: 'photo_album',
      },
    ];
  }
}
