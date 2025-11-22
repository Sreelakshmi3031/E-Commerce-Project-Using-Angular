import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seller-add-product',
  imports: [FormsModule],
  templateUrl: './seller-add-product.html',
  styleUrl: './seller-add-product.scss',
})
export class SellerAddProduct {
  addProduct(data: object) {
    console.warn(data);
  }
}
