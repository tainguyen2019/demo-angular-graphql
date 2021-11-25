import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  links = [
    { name: 'Dashboard', path: 'dashboard' },
    { name: 'All Posts', path: 'post' },
    { name: 'Photo Album', path: 'album' },
    { name: 'Your Todos', path: 'todo' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
