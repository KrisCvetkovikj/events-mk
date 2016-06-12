import {Component, Input, ChangeDetectionStrategy, Output} from "@angular/core";
import {IEvent} from "../../services/events";
import {Subject} from "rxjs/Rx";

@Component({
  selector: 'event-card-text',
  templateUrl: 'js/src/components/event-card-text/event-card-text.html',
  host: {
    '[class.text-column]':'true',
    '[class.column]':'true',
    '[class.col-md-3]':'true'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventCardText {
  @Input() event: IEvent;
  @Input() isFavoritedByCurrentUser: boolean;

  @Output() openDetails: Subject<any> = new Subject();
  @Output() toggleFavoriteEvent: Subject<any> = new Subject();
}

