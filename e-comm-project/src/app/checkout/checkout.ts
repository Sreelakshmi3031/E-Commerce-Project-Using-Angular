import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../services/product';
import { checkout, order, cart } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout implements OnInit {
  totalPrice: number | undefined;

  cartData: cart[] | undefined;

  orderMsg: string = '';
  constructor(private product: Product, private router: Router) {}

  ngOnInit(): void {
    this.product.cartDetails().subscribe((result) => {
      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        price += item?.quantity ? item.price * item.quantity : item.price;
      });
      this.totalPrice = price + price / 10 + 100 - price / 10;
      console.warn(this.totalPrice);
    });
  }

  orderNow(data: checkout) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined,
      };
      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item?.id);
        }, 600);
      });
      this.product.orderData(orderData).subscribe((response) => {
        if (response) {
          this.orderMsg = 'Order Placed Successfully';
          setTimeout(() => {
            this.router.navigateByUrl('/my-orders');
            this.orderMsg = '';
          }, 5000);
        }
      });
    }
  }
}
