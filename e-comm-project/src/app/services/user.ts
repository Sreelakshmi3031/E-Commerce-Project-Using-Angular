import { Injectable } from '@angular/core';
import { login, signUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class User {
  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(data: signUp) {
    this.http
      .post('http://localhost:3000/users', data, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigateByUrl('/');
        }
      });
  }

  userLogin(data: login) {
    this.http
      .get<signUp[]>(
        `http://localhost:3000/users?email=${data?.email}&password=${data?.password}`,
        { observe: 'response' }
      )
      .subscribe((result) => {
        if (result && result.body) {
          console.warn(result);
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigateByUrl('/');
        }
      });
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigateByUrl('/');
    }
  }
}
