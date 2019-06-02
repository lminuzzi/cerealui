import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Cereal Sul';
  user = JSON.parse(window.sessionStorage.getItem('user'));

  constructor(private router: Router, private titleService: Title) { }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  logout(): void {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  ngOnInit() {
    this.setTitle(this.title)
  }
}
