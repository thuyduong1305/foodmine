import { Component } from '@angular/core';
import { Food } from '../../../shared/models/Food';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../../services/food.service';

@Component({
  selector: 'app-create-food',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-food.component.html',
  styleUrl: './create-food.component.css',
})
export class CreateFoodComponent {
  food = {
    name: '',
    price: null,
    cookTime: '',
    favorite: false,
    origins: '',
    stars: null,
    imageUrl: '',
    tags: '',
  };

  constructor(private foodService: FoodService, private router: Router) {}

  onSubmit() {
    const foodToCreate = {
      ...this.food,
      origins: this.food.origins.split(',').map((origin) => origin.trim()),
      tags: this.food.tags.split(',').map((tag) => tag.trim()),
    };

    this.foodService.createFood(foodToCreate).subscribe(
      (response) => {
        console.log('Food created successfully', response);
      },
      (error) => {
        console.error('Error creating food', error);
      }
    );
    this.router.navigateByUrl('foods');
  }
}
