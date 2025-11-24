import { Component, OnInit } from '@angular/core';
import { Product } from '../services/product';
import { product } from '../data-type';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './seller-home.html',
  styleUrl: './seller-home.scss',
})
export class SellerHome implements OnInit {
  productList: undefined | product[];
  productMessage: string | undefined;
  deleteIcon = faTrash;
  editIcon = faEdit;
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
