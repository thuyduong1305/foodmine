import { Component, OnInit } from '@angular/core';
import { Cart } from '../../../shared/models/Cart';
import { CartItem } from '../../../shared/models/CartItem';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { NotFoundComponent } from '../not-found/not-found.component';
import { CartService } from '../../../services/cart.service';
import { FoodService } from '../../../services/food.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    NgFor,
    RouterModule,
    CurrencyPipe,
    FormsModule,
    NgIf,
    NotFoundComponent,
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent implements OnInit {
  cart!: Cart;
  constructor(
    private cartService: CartService,
    private foodService: FoodService
  ) {}

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
    // this.cartService.cartNumber$.next(this.cart.totalCount);
  }

  removeFormCart(cartItem: CartItem): void {
    this.cartService.removeFromCart(cartItem.food.id);
  }
  changeQuantity(cartItem: CartItem, quantityInString: string): void {
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
  }
}
