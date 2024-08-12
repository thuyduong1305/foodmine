import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/Order';

@Component({
  selector: 'paypal-button',
  standalone: true,
  imports: [],
  templateUrl: './paypal-button.component.html',
  styleUrl: './paypal-button.component.css',
})
export class PaypalButtonComponent implements OnInit {
  @Input() order!: Order;
  
  constructor() { }
  
  ngOnInit(): void { }
}
