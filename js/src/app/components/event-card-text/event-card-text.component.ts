import {Component, Input, ChangeDetectionStrategy, Output} from "@angular/core";
import {IEvent} from "../../services/events.service";
import {Subject} from "rxjs";

@Component({
  selector: 'event-card-text',
  templateUrl: 'js/src/app/components/event-card-text/event-card-text.component.html',
  host: {
    '[class.text-column]':'true',
    '[class.column]':'true',
    '[class.col-md-3]':'true'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventCardTextComponent {
  @Input() event: IEvent;
  @Input() isFavoritedByCurrentUser: boolean;

  @Output() openDetails: Subject<any> = new Subject();
  @Output() toggleFavoriteEvent: Subject<any> = new Subject();
}

