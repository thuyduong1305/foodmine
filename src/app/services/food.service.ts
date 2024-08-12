import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Tag } from '../shared/models/Tag';
import {
  FOODS_BY_ID_URL,
  FOODS_BY_SEARCH_URL,
  FOODS_BY_TAG_URL,
  FOODS_TAGS_URL,
  FOODS_URL,
} from '../shared/constants/urls';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  // private url = FOODS_TAGS_URL;
  // private foodsUrl = FOODS_URL;
  // private foodByIDUrl = FOODS_BY_ID_URL;
  constructor(private http: HttpClient) {}
  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }
  getAllFoodsBySearchTerm(searchTerm: string): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }
  getAllFoodsByTag(tag: string): Observable<Food[]> {
    return tag === 'All'
      ? this.getAllFoods()
      : this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);
  }
  // getFood(id: string): Observable<Food> {
  //   const apiUrl = FOODS_BY_ID_URL + id;
  //   return this.http.get<Food>(apiUrl);
  // }
  getFoodById(id: string): Observable<Food> {
    const apiUrl = FOODS_BY_ID_URL + id;
    return this.http.get<Food>(apiUrl);
  }
  getAllFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL);
  }
  createFood(food: any): Observable<any> {
    return this.http.post<any>(FOODS_URL, food);
  }
}
