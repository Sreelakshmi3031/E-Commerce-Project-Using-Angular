import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../services/product';
import { product } from '../data-type';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
  productData: undefined | product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private product: Product
  ) {}

  ngOnInit(): void {
    let productId = this.activatedRoute.snapshot.paramMap.get('productId');
    productId &&
      this.product.getProductById(productId).subscribe((response) => {
        this.productData = response;
      });
  }
}
