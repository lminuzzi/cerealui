import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) { }

  username: string;
  password: string;

  ngOnInit() {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('user');
  }

  login() : void {
    const body = new HttpParams()
      .set('username', this.username)
      .set('password', this.password)
      .set('grant_type', 'password');


    this.userService.login(body.toString()).subscribe(data => {
      window.sessionStorage.setItem('token', JSON.stringify(data));
      //console.log(window.sessionStorage.getItem('token'));
      this.userService.getUserByUsername(this.username).subscribe(user => {
        window.sessionStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['pedidos']);
      }, error => {
        alert(error.error.error_description)
      });
    }, error => {
        alert(error.error.error_description)
    });

    /*
    if(this.username == 'admin' && this.password == 'admin') {
      this.router.navigate(["user"]);
    } else {
      alert("Invalid credentials");
    }
    */

  }
}
