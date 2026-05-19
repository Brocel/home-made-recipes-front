import { Directive } from '@angular/core';

@Directive({
  selector: '[floatingTrigger]',
  standalone: true,
})
export class FloatingTriggerDirective {
  // This directive is used to mark the content of the floating surface. It doesn't have any logic itself, but it allows the FloatingSurface component to identify which element is the content and apply the necessary styles and behavior to it.
}
