import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../services/product';
import { product } from '../data-type';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
  productData: undefined | product;

  productQuantity: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private product: Product
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap((params) => this.product.getProductById(params['productId']))
      )
      .subscribe((response) => {
        this.productData = response;
      });
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val == 'plus') this.productQuantity += 1;
    else if (this.productQuantity > 1 && val == 'min')
      this.productQuantity -= 1;
  }
}
