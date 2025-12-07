import { Component, OnInit } from '@angular/core';
import { Product } from '../services/product';
import { cart, priceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
})
export class CartPage implements OnInit {
  cartData: cart[] | undefined;

  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };

  constructor(private product: Product, private router: Router) {}

  ngOnInit(): void {
    this.product.cartDetails().subscribe((result) => {
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {
        price += item?.quantity ? item.price * item.quantity : item.price;
      });
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total =
        this.priceSummary.price +
        this.priceSummary.tax +
        this.priceSummary.delivery -
        this.priceSummary.discount;
    });
  }

  checkout() {
    this.router.navigateByUrl('/checkout');
  }
}
