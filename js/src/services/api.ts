import {Injectable} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import * as _ from "underscore";
import {Store} from "./store";
import {Observable} from "rxjs/Rx";
import {min} from "rxjs/operator/min";
import {max} from "rxjs/operator/max";

@Injectable()
export class Api {
  token = "EAANgFkSB8gEBADQZCfnic2ts5vnMHrTt7F8sf9q1dZA53ukFs3AKLC46PogISnZBAeDzInoIynSkkhv8jEGZAA3JXoDC3vAn9SJti2Xfz4liZAh9fiXJTs5NOgOpj7zqe44g6m3fZAlDnI2tDjjqRthg81VgTAN1IZD";

  constructor(private _http: Http, private _store: Store) {

  }

  register = (data) => {
    let params: URLSearchParams = new URLSearchParams();
    _(data).each((val, key) => {
      params.set(key, val);
    });

    return Observable.of({
      id: 1,
      username: data.username
    });
    // return this._http.get('/db/addUser', {search: params});
  };

  login = (data) => {
    // let params: URLSearchParams = new URLSearchParams();
    // _(data).each((val, key) => {
    //   params.set(key, val);
    // });

    return Observable.of({
      username: data.username,
      id: 1
    });
    // return this._http.get('/db/getUsers');
  };

  favoriteEvent = (eventId) => {
    let params: URLSearchParams = new URLSearchParams();
    params.set("username", this._store.userSubj.value.username);
    params.set("eventId", eventId);

    return this._http.get('/db/addFavorite', {search: params});
  };

  getFavoriteEventsForUser() {
    let params: URLSearchParams = new URLSearchParams();
    params.set("userId", this._store.userSubj.value.id);

    return this._http.get('/db/getUserFavorites', {search: params});
  }

  fetchEvents = (data?) => {
    _(data).defaults({
      sort: 'time',
      access_token: this.token
    });
    let params: URLSearchParams = new URLSearchParams();
    _(data).each((val, key) => {
      params.set(key, val);
    });

    return this._http.get('/events', {search: params});
  };

  fetchAllEvents = () => {
    let data = {
      sort: 'time',
      access_token: this.token,
      distance: 200000,
      lat: 41.99,
      lng: 21.43
    };

    let params: URLSearchParams = new URLSearchParams();
    _(data).each((val, key) => {
      params.set(key, val);
    });

    return this._http.get('/events', {search: params}).flatMap((val: {_body}) => Observable.of(JSON.parse(val._body).events));
  }
}
