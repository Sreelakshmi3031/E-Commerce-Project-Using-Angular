import { Component, OnInit } from '@angular/core';
import { Product } from '../services/product';
import { order } from '../data-type';

@Component({
  selector: 'app-my-orders',
  imports: [],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.scss',
})
export class MyOrders implements OnInit {
  orderData: order[] | undefined;
  constructor(private product: Product) {}

  ngOnInit(): void {
    this.product.getAllOrders().subscribe((response) => {
      this.orderData = response;
    });
  }
}
