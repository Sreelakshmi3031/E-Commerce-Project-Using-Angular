import { Component, OnInit } from '@angular/core';
import { Product } from '../services/product';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-home',
  imports: [],
  templateUrl: './seller-home.html',
  styleUrl: './seller-home.scss',
})
export class SellerHome implements OnInit {
  productList: undefined | product[];
  constructor(private product: Product) {}

  ngOnInit(): void {
    this.product.productList().subscribe((result) => {
      console.warn(result);
      this.productList = result;
    });
  }
}
