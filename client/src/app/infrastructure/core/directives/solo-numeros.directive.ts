import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appSoloNumeros]',
  standalone: true
})
export class SoloNumerosDirective {

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    input.value = input.value.replace(/\D/g, '');
  }
}