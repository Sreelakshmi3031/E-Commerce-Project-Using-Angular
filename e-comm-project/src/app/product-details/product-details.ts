import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../services/product';
import { cart, product } from '../data-type';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
  productData: undefined | product;

  productQuantity: number = 1;

  removeCart: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private product: Product
  ) {}

  ngOnInit(): void {
    let productId = '';
    this.activatedRoute.params
      .pipe(
        switchMap((params) => {
          productId = params['productId'];
          return this.product.getProductById(params['productId']);
        })
      )
      .subscribe((response) => {
        this.productData = response;
        let cartData = localStorage.getItem('localCartData');
        if (cartData) {
          let items = JSON.parse(cartData);
          items = items.filter(
            (item: product) => productId == item.id.toString()
          );
          if (items.length) this.removeCart = true;
          else this.removeCart = false;
        }
        let user = localStorage.getItem('user');
        if (user) {
          let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId);
          this.product.cartData.subscribe((response) => {
            let items = response.filter((item: product) => {
              productId.toString() === item.productId?.toString();
            });
            if (items.length) {
              this.removeCart = true;
            }
          });
        }
      });
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val == 'plus') this.productQuantity += 1;
    else if (this.productQuantity > 1 && val == 'min')
      this.productQuantity -= 1;
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...this.productData,
          userId,
          productId: this.productData.id,
        };
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((response) => {
          this.product.getCartList(userId);
          this.removeCart = true;
        });
      }
    }
  }

  removeFromCart() {
    this.product.localRemoveFromCart(this.productData?.id);
    this.removeCart = false;
  }
}
