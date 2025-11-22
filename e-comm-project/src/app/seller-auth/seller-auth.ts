import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Seller } from '../services/seller';
import { signUp, login } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule],
  templateUrl: './seller-auth.html',
  styleUrl: './seller-auth.scss',
})
export class SellerAuth implements OnInit {
  showLoginForm: boolean = false;

  errorMsg: string = '';

  constructor(private sellerService: Seller, private router: Router) {}

  ngOnInit(): void {
    this.sellerService.reloadSeller();
  }

  signUp(data: signUp): void {
    console.warn(data);
    // without auth guard
    // this.sellerService.userSignUp(data).subscribe((result)=> {
    //   console.warn('Seller added',result)
    //   if(result) this.router.navigate(['seller-home'])
    // })
    // with auth guard
    this.sellerService.userSignUp(data);
  }

  login(data: login): void {
    this.errorMsg = '';
    this.sellerService.userLogin(data);
    this.sellerService.loginError.subscribe((error) => {
      if (error) this.errorMsg = 'Email or Password is not correct';
    });
  }

  openLogin() {
    this.showLoginForm = true;
  }

  openSignUp() {
    this.showLoginForm = false;
  }
}
