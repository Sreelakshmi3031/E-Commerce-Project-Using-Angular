import { Injectable } from '@angular/core';
import { signUp } from '../data-type';
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
}
