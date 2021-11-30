import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { PostComponent } from './components/post/post.component';
import { TodoComponent } from './components/todo/todo.component';
import { AlbumComponent } from './components/album/album.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ImageListComponent } from './components/image-list/image-list.component';
import { PostDialogComponent } from './components/post-dialog/post-dialog.component';
import { TodoDialogComponent } from './components/todo-dialog/todo-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    TodoComponent,
    AlbumComponent,
    DashboardComponent,
    ImageListComponent,
    PostDialogComponent,
    TodoDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatChipsModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
