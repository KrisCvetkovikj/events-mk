import {Component, ChangeDetectionStrategy, Input} from "@angular/core";

@Component({
  selector: 'curtain',
  templateUrl: 'js/src/app/components/curtain/curtain.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CurtainComponent {
  @Input() shouldShow: boolean = true;
}
