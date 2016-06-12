import {Injectable} from "@angular/core";
import {Observable, Subject, BehaviorSubject} from "rxjs/Rx";
import * as _ from "underscore";

@Injectable()
export class Store {
  userSubj: Subject<any> = new BehaviorSubject(null);
  userId$: Observable<any> = new Subject(null);
  favoriteEvents$: Observable<any>;
  allEventsSubj: Subject<any> = new BehaviorSubject(null);
  searchResultEventsSubj: Subject<any> = new BehaviorSubject([]);
  toggleFavoriteEventSubj: Subject<any> = new Subject();

  constructor(

  ) {
    this.userId$ = this.userSubj.map(user => {
      if (user) {
        return user.id
      } else {
        return null;
      }
    }).distinctUntilChanged();

    this.userSubj.filter(val => !val).subscribe(() => {
      let events = _(this.searchResultEventsSubj.value).map(event => {
        event.isFavoritedByCurrentUser = false;
        return event;
      });

      this.searchResultEventsSubj.next(events);
    });

    this.favoriteEvents$ = this.searchResultEventsSubj.filter(event.isFavoritedByCurrentUser).distinctUntilChanged();
  }

  setUser = (user) => this.userSubj.next(user);
  setAllEvents = (events) => this.allEventsSubj.next(events);
  setSearchResultEvents = (events) => this.searchResultEventsSubj.next(events);
  toggleFavoriteEvent = (event) => {
    event.isFavoritedByCurrentUser = !event.isFavoritedByCurrentUser;
  }

}
