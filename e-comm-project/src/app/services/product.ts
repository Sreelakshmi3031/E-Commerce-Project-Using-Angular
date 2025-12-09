import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';

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

  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }

  getCartList(userId: number) {
    return this.http
      .get<product[]>(`http://localhost:3000/cart?userId=${userId}`, {
        observe: 'response',
      })
      .subscribe((response) => {
        if (response && response.body) {
          this.cartData.emit(response.body);
        }
      });
  }

  removeFromCart(cartId: number | string) {
    return this.http.delete(`http://localhost:3000/cart/${cartId}`);
  }

  cartDetails() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>(
      `http://localhost:3000/cart?userId=${userData.id}`
    );
  }

  orderData(data: order) {
    return this.http.post('http://localhost:3000/orders', data);
  }

  getAllOrders() {
    let userData = localStorage.getItem('user');
    let userId = userData && JSON.parse(userData).id;
    return this.http.get<order[]>(
      `http://localhost:3000/orders?userId=${userId}`
    );
  }

  deleteCartItems(cartdId: number | string) {
    return this.http
      .delete(`http://localhost:3000/cart/${cartdId}`, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          this.cartData.emit([]);
        }
      });
  }

  cancelOrder(orderId: number) {
    return this.http.delete(`http://localhost:3000/orders/${orderId}`);
  }
}
