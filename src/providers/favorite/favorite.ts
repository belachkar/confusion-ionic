import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Dish } from '../../shared/dish';
import { DishProvider } from '../dish/dish';


@Injectable()
export class FavoriteProvider {
  favorites: Array<number> = [];

  constructor(
    public http: HttpClient,
    private dishService: DishProvider,
    private storage: Storage,
    private locNotif: LocalNotifications
  ) {
    console.log('Hello FavoriteProvider Provider');
    this._getStoredFavs();
  }

  addFavorite(id: number): boolean {
    if (!this.isFavorite(id)) {
      this.favorites.push(id);
      this._updateStoredFavs();

      const text = `The dish ${id} was added to your favorites.`;
      this.pushNotification(id, text);
    }
    return true;
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(favId => favId === id);
  }

  getFavorites(): Observable<Dish[]> {

    return this.dishService.getDishes()
      .pipe(
        tap(dishes => this._getStoredFavs()),
        map(dishes => dishes.filter(dish => this.isFavorite(dish.id))),
        catchError(errMsg => {
          console.log(errMsg);
          return of([]);
        })
      );
  }


  deleteFavorite(id: number): Observable<Dish[]> {
    const i = this.favorites.indexOf(id);

    if (i > -1) {
      this.favorites.splice(i, 1);
      this._updateStoredFavs();
      return this.getFavorites();
    } else {
      console.log('The element dosn\'t exists in the Favorites list:', id);
      return Observable.throw('Deleting non-existing favorite: ' + id);
    }
  }

  private _getStoredFavs() {
    return this.storage.get('favorites')
      .then(favorites => this.favorites = favorites || [])
      .catch(errMsg => console.log(errMsg));
  }

  private _updateStoredFavs() {
    this.storage.set('favorites', this.favorites);
  }

  private pushNotification(id: number, text: string) {
    this.locNotif.schedule({ id, text });
  }

}
