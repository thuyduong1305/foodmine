import { Component, NgModule, OnInit } from '@angular/core';
import { CurrencyPipe, NgFor } from '@angular/common';
import { Food } from '../../../shared/models/Food';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SearchComponent } from '../../partials/search/search.component';
import { TagsComponent } from '../../partials/tags/tags.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { Observable } from 'rxjs';
import { FoodService } from '../../../services/food.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    NzRateModule,
    CurrencyPipe,
    SearchComponent,
    TagsComponent,
    RouterModule,
    NotFoundComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];
  // foodsBySearchTerm!: Food[];

  constructor(
    private foodService: FoodService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    let foodsObservable: Observable<Food[]>;
    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm'])
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(
          params['searchTerm']
        );
      else if (params['tag'])
        foodsObservable = this.foodService.getAllFoodsByTag(params['tag']);
      else foodsObservable = this.foodService.getAllFoods();

      foodsObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
      });
    });
  }

  ngOnInit(): void {
    this.getFoods();
  }
  getFoods(): void {
    this.foodService.getAllFoods().subscribe((foods) => {
      this.foods = foods;
      // this.foodsAll = foods;
      // this.foodsBySearchTerm = foods;
    });
  }
  // getAllFoodsBySearchTerm(searchTerm: string): void {
  //   if (searchTerm) {
  //     this.foodsBySearchTerm = this.foods.filter((food) =>
  //       food.name.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   } else {
  //     this.foodsBySearchTerm = this.foods;
  //   }
  // }
  // getAllFoodByTag(tagName: string): void {
  //   this.foodsBySearchTerm =
  //     tagName === 'All'
  //       ? this.foods
  //       : this.foods.filter((food) => food.tags?.includes(tagName));
  // }
}
