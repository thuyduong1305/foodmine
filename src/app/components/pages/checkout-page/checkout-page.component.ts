import { Component, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { CartService } from '../../../services/cart.service';
import {
  NzNotificationDataOptions,
  NzNotificationPlacement,
  NzNotificationService,
} from 'ng-zorro-antd/notification';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { OrderItemListComponent } from '../../partials/order-item-list/order-item-list.component';
import { MapComponent } from '../../partials/map/map.component';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [TextInputComponent, OrderItemListComponent, MapComponent],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css',
})
export class CheckoutPageComponent implements OnInit {
  order: Order = new Order();
  checkoutForm!: FormGroup;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notification: NzNotificationService,
    private orderService: OrderService,
    private router: Router
  ) {
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }
  createNotification(
    type: string,
    title: string,
    content: string,
    position: NzNotificationPlacement,
    duration: number
  ): void {
    const options: NzNotificationDataOptions<{}> = {
      nzPlacement: position,
      nzDuration: duration,
    };
    this.notification.create(type, title, content, options);
  }
  ngOnInit(): void {
    let { name, address } = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name: [name, Validators.required],
      address: [address, Validators.required],
    });
  }
  get fc() {
    return this.checkoutForm.controls;
  }
  createOrder() {
    if (this.checkoutForm.invalid) {
      this.notification.create(
        'error',
        'Invalid Inputs',
        'Please fill the inputs!',
        { nzPlacement: 'bottomRight', nzDuration: 3000 }
      );
      return;
    }
    if (!this.order.addressLatLng) {
      this.notification.create(
        'error',
        'Location',
        'Please select your location on the map!',
        { nzPlacement: 'bottomRight', nzDuration: 3000 }
      );
      return;
    }
    this.order.name = this.fc['name'].value;
    this.order.address = this.fc['address'].value;
    // console.log(this.order);
    this.orderService.create(this.order).subscribe({
      next: () => {
        this.router.navigateByUrl('/payment');
      },
      error: (error) => {
        // console.log(error);
        this.createNotification(
          'error',
          'Cart',
          'Cart is empty!',
          'bottomRight',
          3000
        );
      },
    });
  }
}
