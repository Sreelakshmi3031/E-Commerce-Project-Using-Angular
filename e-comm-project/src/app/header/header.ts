import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../services/product';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  searchedProducts: undefined | product[];
  constructor(private route: Router, private product: Product) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          console.warn('seller area');
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData?.name;
          }
        } else {
          console.warn('outside seller');
          this.menuType = 'default';
        }
      }
    });
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  searchProducts(query: KeyboardEvent) {
    if (query) {
      const queryElement = query.target as HTMLInputElement;
      if (queryElement.value) {
        this.product
          .searchProducts(queryElement.value)
          .subscribe((response) => {
            this.searchedProducts = response;
          });
      } else this.searchedProducts = undefined;
    }
  }

  removeSearchResult() {
    this.searchedProducts = undefined;
  }
}
