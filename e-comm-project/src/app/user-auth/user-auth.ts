import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { signUp } from '../data-type';
import { User } from '../services/user';

@Component({
  selector: 'app-user-auth',
  imports: [FormsModule],
  templateUrl: './user-auth.html',
  styleUrl: './user-auth.scss',
})
export class UserAuth implements OnInit {
  constructor(private user: User) {}

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  userSIgnUp(data: signUp) {
    this.user.userSignUp(data);
  }
}
