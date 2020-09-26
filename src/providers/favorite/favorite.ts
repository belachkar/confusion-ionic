import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dish } from '../../shared/dish';
import { DishProvider } from '../dish/dish';


@Injectable()
export class FavoriteProvider {
  favorites: Array<number>;

  constructor(
    public http: HttpClient,
    private dishService: DishProvider
  ) {
    console.log('Hello FavoriteProvider Provider');
    this.favorites = [];
  }

  addFavorite(id: number): boolean {
    if (!this.isFavorite(id))
      this.favorites.push(id);
    return true;
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(favId => favId === id);
  }

  getFavorites(): Observable<Dish[]> {
    return this.dishService.getDishes()
      .pipe(
        map(dishes => dishes.filter(dish => this.isFavorite(dish.id)))
      );
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    const i = this.favorites.indexOf(id);

    if (i > -1) {
      this.favorites.splice(i, 1);
      return this.getFavorites();
    } else {
      console.log('The element dosn\'t exists in the Favorites list:', id);
      return Observable.throw('Deleting non-existing favorite: ' + id);
    }
  }

}
