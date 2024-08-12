import { Component, OnInit } from '@angular/core';
import { Tag } from '../../../shared/models/Tag';
import { RouterModule } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FoodService } from '../../../services/food.service';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [RouterModule, CommonModule, NgIf, NgFor],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent implements OnInit {
  tags?: Tag[];
  constructor(foodService: FoodService) {
    foodService.getAllTags().subscribe((serverTags) => {
      this.tags = serverTags;
    });
  }

  ngOnInit(): void {}
}
