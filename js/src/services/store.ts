import {Injectable} from "@angular/core";
import {Api} from "./api";
import {Observable, Subject, BehaviorSubject} from "rxjs/Rx";
import * as _ from "underscore";

@Injectable()
export class Store {
  eventsSubj: Subject<any> = new BehaviorSubject(null);
  userSubj: Subject<any> = new BehaviorSubject(null);
  userId$: Observable<any> = new Subject(null);
  favoriteEventsSubj: Subject<any> = new BehaviorSubject(null);

  constructor(
    
  ) {
    this.userId$ = this.userSubj.map(user => user.id).distinctUntilChanged();
  }

  setEvents = (events) => this.eventsSubj.next(events);
  setUser = (user) => this.userSubj.next(user);
  setFavoriteEvents = (events) => this.favoriteEventsSubj.next(events);
  addFavoriteEvent = (event) => this.favoriteEventsSubj.next(this.favoriteEventsSubj.value.push(event));
  removeFavoriteEvent = (event) => this.eventsSubj.next(_(this.favoriteEventsSubj.value).without(event));
}
