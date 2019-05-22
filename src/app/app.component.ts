import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cereal Sul';
  user = JSON.parse(window.sessionStorage.getItem('user'));

  constructor(private router: Router) { }

  logout(): void {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}
