import {Component, Input, ChangeDetectionStrategy, Output} from "@angular/core";
import {IEvent} from "../../services/events.service";
import {Subject} from "rxjs";

@Component({
  selector: 'event-card-big',
  templateUrl: 'js/src/app/components/event-card-big/event-card-big.component.html',
  host: {
    '[class.big-image-column]':'true',
    '[class.column]':'true',
    '[class.col-md-4]':'true'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventCardBigComponent {
  @Input() event: IEvent;
  @Input() isFavoritedByCurrentUser: boolean;

  @Output() openDetails: Subject<any> = new Subject<any>();
  @Output() toggleFavoriteEvent: Subject<any> = new Subject<any>();
}

