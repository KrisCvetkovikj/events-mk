import {Component, ChangeDetectionStrategy, Input} from "@angular/core";

@Component({
  selector: 'curtain',
  templateUrl: 'js/src/components/curtain/curtain.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CurtainComponent {
  @Input() shouldShow: boolean = true;
}
