import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { CurrencyPipe, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'order-item-list',
  standalone: true,
  imports: [NgFor, RouterModule, CurrencyPipe],
  templateUrl: './order-item-list.component.html',
  styleUrl: './order-item-list.component.css',
})
export class OrderItemListComponent implements OnInit {
  @Input() order!: Order;
  constructor() {}
  ngOnInit(): void {}
}
