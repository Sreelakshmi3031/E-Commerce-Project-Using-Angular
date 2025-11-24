import { Routes } from '@angular/router';
import { Home } from './home/home';
import { SellerAuth } from './seller-auth/seller-auth';
import { SellerHome } from './seller-home/seller-home';
import { authGuard } from './guards/auth-guard';
import { SellerAddProduct } from './seller-add-product/seller-add-product';
import { SellerUpdateProduct } from './seller-update-product/seller-update-product';

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
];
