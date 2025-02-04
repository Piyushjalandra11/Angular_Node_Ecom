// import { Routes } from '@angular/router';

// export const routes: Routes = [];


import { Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/auth-guard.service';
import path from 'path';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./modules/products/products.routes').then((m) => m.productsRoutes),
    canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    loadChildren: () => import('./modules/cart/cart/cart.routes').then((m) => m.cartRoutes),
    canActivate: [AuthGuard],
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./modules/orders/orders.routes').then((m) => m.ordersRoutes),
    canActivate: [AuthGuard],
  },
  {
    path: 'checkout',
    loadComponent: () => import('./modules/checkout/checkout.component').then(m => m.CheckoutComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'order-confirmation',
    loadComponent: () => import('./modules/order-confirmation/order-confirmation/order-confirmation.component')
      .then(m => m.OrderConfirmationComponent)
  },
  

  { path: '**', redirectTo: 'auth/login' },
];
