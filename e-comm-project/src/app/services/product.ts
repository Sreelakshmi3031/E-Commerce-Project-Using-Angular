import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { product } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class Product {
  cartData = new EventEmitter<product[] | []>();
  constructor(private http: HttpClient) {}

  addProduct(data: product) {
    return this.http.post('http://localhost:3000/products', data);
  }

  productList() {
    return this.http.get<product[]>('http://localhost:3000/products');
  }

  deleteProduct(id: string) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProductById(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(product: product, productId: string | null) {
    return this.http.put<product>(
      `http://localhost:3000/products/${productId}`,
      product
    );
  }

  getMainProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=4');
  }

  getTrendingProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  }

  searchProducts(query: string) {
    return this.http.get<product[]>(
      `http://localhost:3000/products?q=${query}`
    );
  }

  localAddToCart(data: product) {
    let earlyCartData = [];
    let cartData = localStorage.getItem('localCartData');
    if (!cartData) {
      localStorage.setItem('localCartData', JSON.stringify([data]));
    } else {
      earlyCartData = JSON.parse(cartData);
      earlyCartData.push(data);
      localStorage.setItem('localCartData', JSON.stringify(earlyCartData));
    }
    let finalCartData = localStorage.getItem('localCartData');
    if (finalCartData) this.cartData.emit(JSON.parse(finalCartData));
  }

  localRemoveFromCart(productId: undefined | string) {
    let cartData = localStorage.getItem('localCartData');
    if (cartData) {
      let items = JSON.parse(cartData);
      items = items.filter((item: product) => item.id !== productId);
      localStorage.setItem('localCartData', JSON.stringify(items));
      let finalCartData = localStorage.getItem('localCartData');
      if (finalCartData) this.cartData.emit(JSON.parse(finalCartData));
    }
  }
}
