import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";

@Injectable()
export class EventsService {
  events$: any;

  constructor(
    private _api: ApiService
  ) {

  }

  // fetchEvents = (data) => {
  //   return this._api.fetchEvents(data)
  //   .flatMap((val: {_body}) =>  {
  //     this.events$ =
  //     return Observable.of(JSON.parse(val._body).events);
  //   })
  // };
}

export interface IEvent {
  eventCoverPicture: string,
  eventDescription: string,
  eventDistance: string,
  eventId: string,
  eventName: string,
  eventProfilePicture: string,
  eventStarttime: string,
  eventStats: IEventStats,
  eventTimeFromNow: number,
  venueCoverPicture: string,
  venueId: string,
  venueLocation: ILocation,
  venueName: string,
  venueProfilePicture: string
}


interface IEventStats {
  attendingCount: number,
  declinedCount: number,
  maybeCount: number,
  noreplyCount: number
}

interface ILocation {
  city: string,
  country: string,
  latitude: number,
  longitude: number
}
