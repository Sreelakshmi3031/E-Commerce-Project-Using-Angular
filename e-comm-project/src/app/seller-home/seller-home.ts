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
  productMessage: string | undefined;
  constructor(private product: Product) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.product.productList().subscribe((result) => {
      console.warn(result);
      this.productList = result;
    });
  }

  deleteProduct(id: string) {
    console.warn('id is', id);
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product is successfully deleted.';
        this.getAllProducts();
      }
      setTimeout(() => (this.productMessage = undefined), 3000);
    });
  }
}
