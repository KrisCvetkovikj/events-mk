import {Component, ViewChild, ViewContainerRef} from "@angular/core";
import {ISearchEventLocationItem} from "./components/search-events/search-events.component";
import {BehaviorSubject, combineLatest, Observable, of, Subject} from "rxjs";
import {identity} from "./services/util.service";
import * as _ from "underscore";
import {ApiService} from "./services/api.service";
import {StoreService} from "./services/store.service";
import {BsModalComponent} from "ng2-bs3-modal";
import {distinctUntilChanged, finalize, first, map, mergeMap, startWith, withLatestFrom} from "rxjs/operators";


@Component({
  selector: 'ng2-app',
  templateUrl: 'js/src/app/app.component.html',
})

export class AppComponent {
  @ViewChild('modal')
  modal: BsModalComponent;

  isBusy$: Observable<boolean>;
  fetchEventsTriggers: Subject<any> = new Subject();
  fetchingEventsSubj: Subject<boolean> = new BehaviorSubject(false);
  viewContainerRef: any;
  eventsFilterSubj: Subject<string> = new BehaviorSubject('all');
  displayEvents$: Observable<any>;
  isAuth$: Observable<boolean>;

  selectedEventSubj: Subject<any> = new Subject<any>();
  selectedEvent$: Observable<any>;

  toggleFavEventTrigger: Subject<any> = new Subject();

  // filters
  entryCardTypeSubj: Subject<any> = new BehaviorSubject<any>('big');
  entryCardType$: Observable<string>;

  displayName$: Observable<string>;


  openLoginModalSubj: Subject<any> = new Subject();

  constructor(
    private _api: ApiService,
    private _store: StoreService,
    viewContainerRef: ViewContainerRef
  ) {
    this.viewContainerRef = viewContainerRef;
    this.isBusy$ = this.fetchingEventsSubj.asObservable().pipe();
    this.entryCardType$ = this.entryCardTypeSubj.asObservable().pipe();
    this.isAuth$ = this._store.userId$.lift(val => !!val);
    this.displayName$ = this._store.userSubj.lift(identity).lift(val => val.username);

    // this.displayEvents$ = Observable.combineLatest(
    //   this.eventsFilterSubj,
    //   this._store.searchResultEventsSubj,
    //   this._store.favoriteEvents$,
    //   (filter, events, favorite) => {return {filter, events, favorite};}
    // ).map(data => {
    //   let {filter, events, favorite} = data;
    //   if(filter == 'all') return events;
    //   if(filter == 'favorite') return favorite;
    // });

    this.displayEvents$ = combineLatest(
      this._store.searchResultEventsSubj.pipe(distinctUntilChanged()),
      this.eventsFilterSubj.pipe(distinctUntilChanged()),
      startWith(this.toggleFavEventTrigger),
      (events, filter, toggleFavEvent) => {
        return {events, filter, toggleFavEvent}
      }
    ).pipe(map(data => {
      let {events, filter, toggleFavEvent} = data;

      if (filter == 'all') {
        return events;
      } else if (filter == 'favorite') {
        return _(events).filter(event => event.isFavoritedByCurrentUser);
      }
    })).pipe(distinctUntilChanged());

    this.toggleFavEventTrigger.pipe(withLatestFrom(this.isAuth$))
      .subscribe(data => {
        let event = data[0];
        let isAuth = data[1];

        if (isAuth) {
          this.toggleFavoriteEvent(event);
        } else {
          this.openLoginModalSubj.next(true);
        }
      });
    this.fetchEventsTriggers.pipe(distinctUntilChanged()).subscribe(this._fetchEvents);
  }

  private _fetchEvents = (data: ISearchEventLocationItem) => {
    this.fetchingEventsSubj.next(true);
    let {lat, lng, distance, sort, fromDate, toDate} = data;
    let params = {
      lat: lat,
      lng: lng,
      distance: distance,
      sort: sort || 'time'
    };
    let fromDateTimeFilter = fromDate ? new Date(fromDate) : null;
    let toDateTimeFilter = toDate ? new Date(toDate) : null;

    this._api.fetchEvents(params).pipe(
      mergeMap((val: { _body }) => of(JSON.parse(val._body).events)),
      first(),
      finalize(() => this.fetchingEventsSubj.next(false)),
      map(events => {
        let res: any = [];
        if (fromDateTimeFilter || toDateTimeFilter) {
          res = _(events).filter(event => {
            let eventFromDateTime = new Date(event.eventStarttime);
            return (
              fromDateTimeFilter <= eventFromDateTime &&
              toDateTimeFilter >= eventFromDateTime
            );
          });

        } else {
          res = events;
        }
        return of(res).pipe(map(event => {
          if (event.eventDescription) {
            event.shortDescription = event.eventDescription.substring(0, 100) + '...';
          }
          if (event.eventStats) {
            event.eventStats.totalCount = event.eventStats.attendingCount + event.eventStats.declinedCount + event.eventStats.maybeCount + event.eventStats.noreplyCount;
          }
          if (event.eventStarttime) {
            event.eventStartTime = new Date(event.eventStarttime);
          }


          return event;
        }));
      }))
      .subscribe(events => this._store.setSearchResultEvents(events));

    this._api.login({username: 'test'}).subscribe();
  };


  toggleFavoriteEvent(event) {
    this._store.toggleFavoriteEvent(event);
  }

  close = () => {
    this.modal.close();
  };

  open = (event) => {
    this.selectedEventSubj.next(event);
    this.modal.open();
  }

}
