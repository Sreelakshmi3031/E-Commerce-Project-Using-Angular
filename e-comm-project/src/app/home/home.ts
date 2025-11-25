import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../services/product';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  imports: [NgbModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  popularProducts: undefined | product[];

  constructor(private product: Product) {}

  ngOnInit(): void {
    this.product.getMainProducts().subscribe((response) => {
      this.popularProducts = response;
    });
  }
}
