import {Pipe} from "@angular/core";
import {DomSanitizationService} from "@angular/platform-browser";


@Pipe({name: 'safe'})
export class SafePipe {
  constructor(private sanitizer:DomSanitizationService){
    this.sanitizer = sanitizer;
  }

  transform(style) {
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }
}
