import { Routes } from '@angular/router';
import { Home } from './home/home';
import { SellerAuth } from './seller-auth/seller-auth';
import { SellerHome } from './seller-home/seller-home';
import { authGuard } from './guards/auth-guard';
import { SellerAddProduct } from './seller-add-product/seller-add-product';
import { SellerUpdateProduct } from './seller-update-product/seller-update-product';
import { Search } from './search/search';
import { ProductDetails } from './product-details/product-details';
import { UserAuth } from './user-auth/user-auth';
import { CartPage } from './cart-page/cart-page';
import { Checkout } from './checkout/checkout';
import { MyOrders } from './my-orders/my-orders';

export const routes: Routes = [
  {
    component: Home,
    path: '',
  },
  {
    component: SellerAuth,
    path: 'seller-auth',
  },
  {
    component: SellerHome,
    path: 'seller-home',
    canActivate: [authGuard],
  },
  {
    component: SellerAddProduct,
    path: 'seller-add-product',
    canActivate: [authGuard],
  },
  {
    component: SellerUpdateProduct,
    path: 'seller-update-product/:id',
    canActivate: [authGuard],
  },
  {
    component: Search,
    path: 'search/:query',
  },
  {
    component: ProductDetails,
    path: 'details/:productId',
  },
  {
    component: UserAuth,
    path: 'user-auth',
  },
  {
    component: CartPage,
    path: 'cart-page',
  },
  {
    component: Checkout,
    path: 'checkout',
  },
  {
    component: MyOrders,
    path: 'my-orders',
  },
];
