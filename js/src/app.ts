import {Component, ViewContainerRef, ViewChild} from "@angular/core";
import {Header} from "./components/header/header";
import {SearchEvents, ISearchEventLocationItem} from "./components/search-events/search-events";
import {Events} from "./services/events";
import {Observable, BehaviorSubject, Subject} from "rxjs/Rx";
import {EventCardBig} from "./components/event-card-big/event-card-big";
import {EventCardImage} from "./components/event-card-image/event-card-image";
import {EventCardText} from "./components/event-card-text/event-card-text";
import {CurtainComponent} from "./components/curtain/curtain";
import {identity} from "./services/util";
import * as _ from "underscore";
import {MODAL_DIRECTIVES, ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';
import {EventDetailsModal} from "./components/event-details-modal/event-details-modal";
import {Http} from "@angular/http";
import {Api} from "./services/api";
import {Store} from "./services/store";


@Component({
  selector: 'ng2-app',
  templateUrl: 'js/src/app.html',
  directives: [
    Header,
    SearchEvents,
    EventCardBig,
    EventCardImage,
    EventCardText,
    CurtainComponent,
    MODAL_DIRECTIVES,
    EventDetailsModal
  ]
})

export class App {
  @ViewChild('modal')
  modal: ModalComponent;

  // eventsSubj: Subject<any> = new Subject();
  // events$: Observable<any>;
  isBusy$: Observable<boolean>;
  fetchEventsTriggers: Subject<any> = new Subject();
  fetchingEventsSubj: Subject<boolean> = new BehaviorSubject(false);
  viewContainerRef: any;
  eventsFilterSubj: Subject<string> = new BehaviorSubject('all');
  displayEvents$: Observable<any>;
  isAuth$: Observable<boolean>;

  selectedEventSubj: Subject = new Subject();
  selectedEvent$: Observable<any>;

  toggleFavEventTrigger: Subject<any> = new Subject();

  // filters
  entryCardTypeSubj: Subject = new BehaviorSubject('big');
  entryCardType$: Observable<string>;

  displayName$: Observable<string>;


  openLoginModalSubj: Subject<any> = new Subject();

  constructor(
    private _events: Events,
    private _api: Api,
    private _store: Store,
    viewContainerRef: ViewContainerRef
  ) {
    this.viewContainerRef = viewContainerRef;
    this.isBusy$ = this.fetchingEventsSubj.asObservable().distinctUntilChanged();
    this.entryCardType$ = this.entryCardTypeSubj.asObservable().distinctUntilChanged();
    this.isAuth$ = this._store.userId$.map(val => !!val);
    this.displayName$ = this._store.userSubj.filter(identity).map(val => val.username);

    this.displayEvents$ = Observable.combineLatest(
      this.eventsFilterSubj,
      this._store.searchResultEventsSubj,
      this._store.favoriteEventsSubj,
      (filter, events, favorite) => {return {filter, events, favorite};}
    ).map(data => {
      let {filter, events, favorite} = data;
      if(filter == 'all') return events;
      if(filter == 'favorite') return favorite;
    });

    this.toggleFavEventTrigger.withLatestFrom(this.isAuth$)
      .subscribe(data => {
        let event = data[0];
        let isAuth = data[1];

        if(isAuth) {
          this.toggleFavoriteEvent(event);
        } else {
          this.openLoginModalSubj.next(true);
        }
      });
    // this._api.fetchAllEvents()
    //   .first()
    //   .map(events => {
    //     return events.map(event => {
    //       if(event.eventDescription) {
    //         event.shortDescription = event.eventDescription.substring(0, 100) + '...';
    //       }
    //       if(event.eventStats) {
    //         event.eventStats.totalCount = event.eventStats.attendingCount + event.eventStats.declinedCount + event.eventStats.maybeCount + event.eventStats.noreplyCount;
    //       }
    //       if(event.eventStarttime) {
    //         event.eventStartTime = new Date(event.eventStarttime);
    //       }
    //
    //
    //       return event;
    //     });
    //   }).subscribe(this._store.setAllEvents);

    // this.events$ = this.fetchEventsTriggers
    //   .flatMap(this._fetchEvents)
    //   .filter(identity);

    this.fetchEventsTriggers.distinctUntilChanged().subscribe(this._fetchEvents);
    // this.fetchEventsTriggers.subscribe(val => console.log(val));

    // this.events$.subscribe(val => console.log(val));
    // this.entryCardType$.subscribe(val => console.log('entryCardTypeSubj: ', val));
    // this.isBusy$.subscribe(val => console.log('isBusy$: ', val));
    // this.events$.subscribe(val => console.log('events$: ', val));
  }

  private _fetchEvents = (data: ISearchEventLocationItem) => {
    this.fetchingEventsSubj.next(true);
    let {location, sort, fromDate, toDate} = data;
    let params = {
      lat: location.lat,
      lng: location.lng,
      distance: location.distance,
      sort: sort || 'time'
    };
    let fromDateTimeFilter = fromDate ? new Date(fromDate) : null;
    let toDateTimeFilter = toDate ? new Date(toDate) : null;

    this._api.fetchEvents(params)
      .flatMap((val: {_body}) => Observable.of(JSON.parse(val._body).events))
      .first()
      .finally(() => this.fetchingEventsSubj.next(false))
      .map(events => {
        let res = [];
        if(fromDateTimeFilter || toDateTimeFilter) {
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
        return res.map(event => {
          if(event.eventDescription) {
            event.shortDescription = event.eventDescription.substring(0, 100) + '...';
          }
          if(event.eventStats) {
            event.eventStats.totalCount = event.eventStats.attendingCount + event.eventStats.declinedCount + event.eventStats.maybeCount + event.eventStats.noreplyCount;
          }
          if(event.eventStarttime) {
            event.eventStartTime = new Date(event.eventStarttime);
          }


          return event;
        });
    }).subscribe(events => this._store.setSearchResultEvents(events));

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
