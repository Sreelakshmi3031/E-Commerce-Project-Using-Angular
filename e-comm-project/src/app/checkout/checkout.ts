import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../services/product';
import { checkout, order } from '../data-type';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout implements OnInit {
  totalPrice: number | undefined;
  constructor(private product: Product) {}

  ngOnInit(): void {
    this.product.cartDetails().subscribe((result) => {
      let price = 0;
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
      };
      this.product.orderData(orderData).subscribe((response) => {
        if (response) {
          alert('Order Placed');
        }
      });
    }
  }
}
