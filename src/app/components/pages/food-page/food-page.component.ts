import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { TagsComponent } from '../../partials/tags/tags.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { Food } from '../../../shared/models/Food';
import { FoodService } from '../../../services/food.service';
import { CartService } from '../../../services/cart.service';


@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [
    NzRateModule,
    FormsModule,
    NgFor,
    TagsComponent,
    CurrencyPipe,
    RouterModule,
    NotFoundComponent,
    NgIf,
  ],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css',
})
export class FoodPageComponent implements OnInit {
  food!: Food;
  constructor(
    private route: ActivatedRoute,
    private foodService: FoodService,
    private cartService: CartService,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        const foodId = parseInt(params['id'], 10);
        this.foodService
          .getFoodById(params['id'])
          .subscribe((food) => (this.food = food));
      }
    });
  }

  ngOnInit(): void {}

  addToCart(): void {
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}
