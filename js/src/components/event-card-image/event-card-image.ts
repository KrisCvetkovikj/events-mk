import {Component, Input, ChangeDetectionStrategy, Output} from "@angular/core";
import {IEvent} from "../../services/events";
import {Subject} from "rxjs/Rx";

@Component({
  selector: 'event-card-image',
  templateUrl: 'js/src/components/event-card-image/event-card-image.html',
  host: {
    '[class.image-column]':'true',
    '[class.column]':'true',
    '[class.col-xs-12]':'true',
    '[class.col-md-6]':'true'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventCardImage {
  @Input() event: IEvent;
  @Input() isFavoritedByCurrentUser: boolean;

  @Output() openDetails: Subject<any> = new Subject();
  @Output() toggleFavoriteEvent: Subject<any> = new Subject();
}

