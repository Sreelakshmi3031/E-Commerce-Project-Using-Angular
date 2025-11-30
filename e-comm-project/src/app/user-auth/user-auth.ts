import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { cart, login, product, signUp } from '../data-type';
import { User } from '../services/user';
import { Product } from '../services/product';

@Component({
  selector: 'app-user-auth',
  imports: [FormsModule],
  templateUrl: './user-auth.html',
  styleUrl: './user-auth.scss',
})
export class UserAuth implements OnInit {
  showLoginForm: boolean = false;

  invalidUserErrorMsg: string = '';
  constructor(private user: User, private product: Product) {}

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
      } else {
        let userData = localStorage.getItem('user');
        let userId = userData && JSON.parse(userData).id;
        let cartData = localStorage.getItem('localCartData');
        if (cartData) {
          let cartDataDetails: product[] = JSON.parse(cartData);
          cartDataDetails.forEach((product: product, index) => {
            let cartItem: cart = {
              ...product,
              productId: product.id,
              userId,
            };
            delete cartItem.id;
            setTimeout(() => {
              this.product.addToCart(cartItem).subscribe((result) => {
                console.warn(result);
              });
              if (cartDataDetails.length === index + 1) {
                localStorage.removeItem('localCartData');
              }
            }, 500);
          });
        }
        setTimeout(() => {
          this.product.getCartList(userId);
        }, 2000);
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
