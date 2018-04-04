import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appJdbPlgTooltip]'
})
export class JdbPlgTooltipDirective {

  constructor(public elementRef: ElementRef) {
  }

}
