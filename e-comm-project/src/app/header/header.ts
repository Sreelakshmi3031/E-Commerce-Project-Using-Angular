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
  userName: string = '';
  searchedProducts: undefined | product[];
  cartItems: number = 0;
  constructor(private route: Router, private product: Product) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          console.warn('seller area');
          this.menuType = 'seller';
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData?.name;
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
        } else {
          console.warn('outside seller');
          this.menuType = 'default';
        }
      }
    });
    let cartData = localStorage.getItem('localCartData');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }
    this.product.cartData.subscribe((result) => {
      this.cartItems = result.length;
    });
  }

  sellerLogout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  userLogout() {
    localStorage.removeItem('user');
    this.route.navigateByUrl('/user-auth');
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

  onSearch(val: string) {
    this.route.navigateByUrl(`/search/${val}`);
  }

  redirectToDetails(id: string) {
    this.route.navigateByUrl(`details/${id}`);
  }
}
