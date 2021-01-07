import {Injectable} from "@angular/core";
import * as _ from "underscore";
import {StoreService} from "./store.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {of} from "rxjs";
import {flatMap, map} from "rxjs/internal/operators";

@Injectable()
export class ApiService {
  token = "EAANgFkSB8gEBADQZCfnic2ts5vnMHrTt7F8sf9q1dZA53ukFs3AKLC46PogISnZBAeDzInoIynSkkhv8jEGZAA3JXoDC3vAn9SJti2Xfz4liZAh9fiXJTs5NOgOpj7zqe44g6m3fZAlDnI2tDjjqRthg81VgTAN1IZD";

  constructor(private _http: HttpClient, private _store: StoreService) {

  }

  register = (data) => {
    let params: HttpParams = new HttpParams();
    _(data).each((val, key) => {
      params.set(key, val);
    });

    return of({
      id: 1,
      username: data.username
    });
    // return this._http.get('/db/addUser', {search: params});
  };

  login = (data) => {
    // let params: HttpParams = new HttpParams();
    // _(data).each((val, key) => {
    //   params.set(key, val);
    // });

    return of({
      username: data.username,
      id: 1
    });
    // return this._http.get('/db/getUsers');
  };

  favoriteEvent = (eventId) => {
    let params: HttpParams = new HttpParams();
    this._store.userSubj.subscribe(val => {
      params.set("username", val.username);
    });
    params.set("eventId", eventId);

    return this._http.get('/db/addFavorite', {params: params});
  };

  getFavoriteEventsForUser() {
    let params: HttpParams = new HttpParams();
    this._store.userSubj.subscribe(val => {
      params.set("userId", val.id);
    });
    return this._http.get('/db/getUserFavorites', {params: params});
  }

  fetchEvents = (data?) => {
    _(data).defaults({
      sort: 'time',
      access_token: this.token
    });
    let params: HttpParams = new HttpParams();
    _(data).each((val, key) => {
      params.set(key, val);
    });

    return this._http.get('/events', {params: params});
  };

  fetchAllEvents = () => {
    let data = {
      sort: 'time',
      access_token: this.token,
      distance: 200000,
      lat: 41.99,
      lng: 21.43
    };

    let params: HttpParams = new HttpParams();
    _(data).each((val, key) => {
      params.set(key, val);
    });

    return this._http.get('/events', {params: params})
      .pipe(flatMap((val: { _body }) => of(JSON.parse(val._body).events)))
  }
}
