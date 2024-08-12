import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { CreateFoodComponent } from './components/pages/create-food/create-food.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { authGuard } from './auth/guards/auth.guard';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { ChartFoodComponent } from './components/partials/chart-food/chart-food.component';

const routeConfig: Routes = [
  { path: '', redirectTo: '/foods', pathMatch: 'full' },
  { path: 'foods', component: HomeComponent },
  { path: 'search/:searchTerm', component: HomeComponent },
  { path: 'tag/:tag', component: HomeComponent },
  { path: 'food/:id', component: FoodPageComponent },

  { path: 'cart-page', component: CartPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'payment',
    component: PaymentPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: 'create-food', component: CreateFoodComponent },
      { path: 'chart-food', component: ChartFoodComponent },
    ],
  },
];

export default routeConfig;
