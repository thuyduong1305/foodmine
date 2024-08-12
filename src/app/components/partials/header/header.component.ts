import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';
import { NgIf } from '@angular/common';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NzBadgeModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  user!: User;
  cartNumber!: number;
  constructor(
    private router: Router,
    private cartService: CartService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.cartService
      .getCartObservable()
      .subscribe((cart) => (this.cartNumber = cart.totalCount));
    this.userService.userObservable.subscribe((user) => (this.user = user));
  }
  // goBack(): void {
  //   this.router.navigateByUrl('/');
  // }
  logout() {
    this.userService.logout();
  }
  get isAuth() {
    return this.user.token;
  }
}
