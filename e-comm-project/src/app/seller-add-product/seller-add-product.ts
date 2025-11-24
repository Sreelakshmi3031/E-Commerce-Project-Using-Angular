import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../services/product';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  imports: [FormsModule],
  templateUrl: './seller-add-product.html',
  styleUrl: './seller-add-product.scss',
})
export class SellerAddProduct {
  addProductMessage: string | undefined;
  constructor(private product: Product) {}

  addProduct(data: product, addProductForm: any) {
    this.product.addProduct(data).subscribe((response) => {
      console.warn(response);
      if (response) {
        this.addProductMessage = 'Product is successfully added.';
        addProductForm.reset();
      }
      setTimeout(() => (this.addProductMessage = undefined), 3000);
    });
  }
}
