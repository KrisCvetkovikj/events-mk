import {Component, Input, ChangeDetectionStrategy} from "@angular/core";
import {IEvent} from "../../services/events.service";
import {monthNames} from "../../services/util.service";
import {SafePipe} from "../../pipes/safe.pipe";

@Component({
  selector: 'event-details-modal',
  templateUrl: 'js/src/app/components/event-details-modal/event-details-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventDetailsModalComponent {
  @Input() event: IEvent;

  getMonthName(monthNo) {
    return monthNames[monthNo];
  }
}

