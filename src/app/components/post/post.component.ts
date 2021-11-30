import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { MatDialog } from '@angular/material/dialog';

import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { GET_POSTS } from 'src/app/graphql/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy {
  loading = true;
  posts: any;
  totalItems: number | undefined;
  page = 1;
  limit = 9;
  selectedPost: string | undefined;

  @Input() enableActions: boolean = true;
  @Input() enablePaginator: boolean = true;

  private querySubscription: Subscription | undefined;

  constructor(private apollo: Apollo, public dialog: MatDialog) {}

  ngOnInit() {
    this.getPosts();
  }

  ngOnDestroy() {
    if (this.querySubscription) this.querySubscription.unsubscribe();
  }

  handlePageChange(event: any): void {
    this.page = event;
    this.getPosts();
  }

  getPosts() {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: GET_POSTS,
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
        this.posts = data.posts.data;
        this.totalItems = data.posts.meta.totalCount;
      });
  }

  openDialog(action: string): void {
    let data: any;
    if (action === 'edit') {
      data = this.posts.find((post: any) => post.id === this.selectedPost);
    }
    if (action === 'create') {
      data = { id: `${this.totalItems! + 1}`, title: '', body: '' };
    }
    data = { ...data, action };

    const dialogRef = this.dialog.open(PostDialogComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  editPost(postId: string): void {
    this.selectedPost = postId;
    this.openDialog('edit');
  }

  createPost(): void {
    this.openDialog('create');
  }
}
