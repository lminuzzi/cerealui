import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) { }

  addForm: FormGroup;
  user = JSON.parse(window.sessionStorage.getItem('user'));

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      username: ['', Validators.required],
      nome: ['', Validators.required],
      password: ['', Validators.required],
      perfil: ['', Validators.required]
    });
  }

  listUser(): void {
    this.router.navigate(['list-user']);
  };

  onSubmit() {
    this.userService.createUser(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['list-user']);
      });
  }
}
