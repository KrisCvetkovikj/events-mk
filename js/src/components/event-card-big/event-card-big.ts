import {Component, Input, ChangeDetectionStrategy, Output} from "@angular/core";
import {IEvent} from "../../services/events";
import {Subject} from "rxjs/Rx";

@Component({
  selector: 'event-card-big',
  templateUrl: 'js/src/components/event-card-big/event-card-big.html',
  host: {
    '[class.big-image-column]':'true',
    '[class.column]':'true',
    '[class.col-md-4]':'true'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventCardBig {
  @Input() event: IEvent;
  @Input() isFavoritedByCurrentUser: boolean;

  @Output() openDetails: Subject<any> = new Subject();
  @Output() toggleFavoriteEvent: Subject<any> = new Subject();
}

