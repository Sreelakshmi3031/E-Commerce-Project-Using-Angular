import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../services/product';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  imports: [FormsModule],
  templateUrl: './seller-update-product.html',
  styleUrl: './seller-update-product.scss',
})
export class SellerUpdateProduct implements OnInit {
  productData: undefined | product;
  constructor(private route: ActivatedRoute, private product: Product) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.warn(productId);
    productId &&
      this.product.getProductById(productId).subscribe((response) => {
        this.productData = response;
      });
  }
  editProduct(data: any, formValue: any) {}
}
