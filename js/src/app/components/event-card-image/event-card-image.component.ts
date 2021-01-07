import {Component, Input, ChangeDetectionStrategy, Output} from "@angular/core";
import {IEvent} from "../../services/events.service";
import {Subject} from "rxjs";

@Component({
  selector: 'event-card-image',
  templateUrl: 'js/src/app/components/event-card-image/event-card-image.component.html',
  host: {
    '[class.image-column]':'true',
    '[class.column]':'true',
    '[class.col-xs-12]':'true',
    '[class.col-md-6]':'true'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventCardImageComponent {
  @Input() event: IEvent;
  @Input() isFavoritedByCurrentUser: boolean;

  @Output() openDetails: Subject<any> = new Subject();
  @Output() toggleFavoriteEvent: Subject<any> = new Subject();
}

