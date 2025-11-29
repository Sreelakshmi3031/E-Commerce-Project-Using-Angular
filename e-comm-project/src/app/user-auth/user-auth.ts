import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { signUp } from '../data-type';

@Component({
  selector: 'app-user-auth',
  imports: [FormsModule],
  templateUrl: './user-auth.html',
  styleUrl: './user-auth.scss',
})
export class UserAuth {
  userSIgnUp(data: signUp) {
    console.warn(data);
  }
}
