import {Component, Input, ChangeDetectionStrategy} from "@angular/core";
import {IEvent} from "../../services/events";
import {monthNames} from "../../services/util";
import {SafePipe} from "../../pipes/safe";

@Component({
  selector: 'event-details-modal',
  templateUrl: 'js/src/components/event-details-modal/event-details-modal.html',
  pipes: [SafePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventDetailsModal {
  @Input() event: IEvent;

  getMonthName(monthNo) {
    return monthNames[monthNo];
  }
}

