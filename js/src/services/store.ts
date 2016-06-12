import {Injectable} from "@angular/core";
import {Api} from "./api";
import {Observable, Subject, BehaviorSubject} from "rxjs/Rx";
import * as _ from "underscore";
import {identity} from "./util";

@Injectable()
export class Store {
  eventsSubj: Subject<any> = new BehaviorSubject(null);
  userSubj: Subject<any> = new BehaviorSubject(null);
  userId$: Observable<any> = new Subject(null);
  favoriteEventsSubj: Subject<any> = new BehaviorSubject([]);
  allEventsSubj: Subject<any> = new BehaviorSubject(null);
  toggleFavoriteEventSubj: Subject<any> = new Subject();
  searchResultEventsSubj: Subject<any> = new BehaviorSubject([]);

  constructor(

  ) {
    this.userId$ = this.userSubj.map(user => {
      if(user) {
        return user.id
      } else {
        return null;
      }
    }).distinctUntilChanged();
    // this.favoriteEvents$ = Observable.combineLatest(
    //   this.allEventsSubj,
    //   this.favoriteEventsSubj,
    //   (allEvents, favEvents) => {return {allEvents, favEvents};}
    // ).map(data => {
    //   let {allEvents, favEvents} = data;
    //   let r = _(favEvents).map(event => {
    //     return _(allEvents).findWhere({eventId: event.fav_id.toString()});
    //   });
    //   return r;
    // });

    this.allEventsSubj.subscribe(val => console.log(val));
    this.favoriteEventsSubj.subscribe(val => console.log(val));
    // this.favoriteEvents$.subscribe(val => console.log(val));
  }

  setEvents = (events) => this.eventsSubj.next(events);
  setUser = (user) => this.userSubj.next(user);
  setFavoriteEvents = (events) => this.favoriteEventsSubj.next(events);
  addFavoriteEvent = (event) => {
    event.isFavoritedByCurrentUsed = true;
    let events = this.favoriteEventsSubj.value;
    events.push(event);
    this.favoriteEventsSubj.next(events);
  };
  removeFavoriteEvent = (event) => {
    event.isFavoritedByCurrentUsed = false;
    let events = _(this.favoriteEventsSubj.value).without(event);
    this.favoriteEventsSubj.next(events);
  };
  setAllEvents = (events) => this.allEventsSubj.next(events);
  setSearchResultEvents = (events) => this.searchResultEventsSubj.next(events);
  toggleFavoriteEvent = (event) => {
    if(!_(this.favoriteEventsSubj.value).findWhere({eventId: event.eventId})) {
      this.addFavoriteEvent(event);
    } else {
      this.removeFavoriteEvent(event);
    }
  }

}
