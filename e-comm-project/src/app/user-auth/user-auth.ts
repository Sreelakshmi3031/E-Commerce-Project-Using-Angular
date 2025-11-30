import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { login, signUp } from '../data-type';
import { User } from '../services/user';

@Component({
  selector: 'app-user-auth',
  imports: [FormsModule],
  templateUrl: './user-auth.html',
  styleUrl: './user-auth.scss',
})
export class UserAuth implements OnInit {
  showLoginForm: boolean = false;

  invalidUserErrorMsg: string = '';
  constructor(private user: User) {}

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  userSignUp(data: signUp) {
    this.user.userSignUp(data);
  }

  userLogin(data: login) {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.invalidUserErrorMsg = 'User does not exist';
      }
    });
  }

  openLogin() {
    this.showLoginForm = true;
  }

  openSignUp() {
    this.showLoginForm = false;
  }
}
