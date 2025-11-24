import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  updateProductMessage: undefined | string;
  productId: null | string = null;
  constructor(
    private route: ActivatedRoute,
    private product: Product,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    console.warn(this.productId);
    this.productId &&
      this.product.getProductById(this.productId).subscribe((response) => {
        this.productData = response;
      });
  }
  editProduct(data: product, editProductForm: any) {
    this.product.updateProduct(data, this.productId).subscribe((response) => {
      if (response) {
        this.updateProductMessage = 'Product Updated Successfully.';
        editProductForm.reset();
      }
      setTimeout(() => {
        this.updateProductMessage = undefined;
        this.router.navigateByUrl('/seller-home');
      }, 3000);
    });
  }
}
