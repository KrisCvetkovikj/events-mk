import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {distinctUntilChanged, filter, map} from "rxjs/operators";

@Injectable()
export class StoreService {
  userSubj: Subject<any> = new BehaviorSubject(null);
  userId$: Observable<any> = new Subject<any>();
  favoriteEvents$: Observable<any>;
  allEventsSubj: Subject<any> = new BehaviorSubject(null);
  searchResultEventsSubj: Subject<any> = new BehaviorSubject([]);
  toggleFavoriteEventSubj: Subject<any> = new Subject();

  constructor() {
    this.userId$ = this.userSubj.pipe(
      map(user => {
        if (user) {
          return user.id
        } else {
          return null;
        }
      }),
      distinctUntilChanged()
    );

    this.userSubj.pipe(filter(val => !val))
      .subscribe(() => {
        let events = this.searchResultEventsSubj.pipe(map(event => {
          event.isFavoritedByCurrentUser = false;
          return event;
        }));

        this.searchResultEventsSubj.next(events);
      });

    this.favoriteEvents$ = this.searchResultEventsSubj.pipe(
      filter(event => event.isFavoritedByCurrentUser),
      distinctUntilChanged()
    );
  }

  setUser = (user) => this.userSubj.next(user);
  setAllEvents = (events) => this.allEventsSubj.next(events);
  setSearchResultEvents = (events) => this.searchResultEventsSubj.next(events);
  toggleFavoriteEvent = (event) => {
    event.isFavoritedByCurrentUser = !event.isFavoritedByCurrentUser;
  }

}
