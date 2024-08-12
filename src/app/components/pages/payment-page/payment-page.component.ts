import { Component, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { OrderItemListComponent } from '../../partials/order-item-list/order-item-list.component';
import { MapComponent } from '../../partials/map/map.component';
import { PaypalButtonComponent } from '../../partials/paypal-button/paypal-button.component';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [
    TextInputComponent,
    OrderItemListComponent,
    MapComponent,
    PaypalButtonComponent,
  ],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css',
})
export class PaymentPageComponent implements OnInit {
  order: Order = new Order();

  constructor(private orderService: OrderService, private router: Router) {
    orderService.getNewOrderForCurrentUser().subscribe({
      next: (order) => {
        this.order = order;
      },
      error: (error) => {
        router.navigateByUrl('/checkout');
      },
    });
  }

  ngOnInit(): void {}
}
