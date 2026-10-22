// import { Directive, HostListener } from '@angular/core';
// import { NgControl } from '@angular/forms';

// @Directive({
//   selector: '[appSoloLetras]'
// })
// export class SoloLetrasDirective {

//   constructor(private ngControl: NgControl) {}

//   @HostListener('input', ['$event']) onInputChange(event: any) {
//     // Reemplaza cualquier carácter que no sea una letra
//     const valor = event.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
//     this.ngControl.control?.setValue(valor); 
//   }
// }


import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appSoloLetras]',
  standalone: true
})
export class SoloLetrasDirective {

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    input.value = input.value.replace(
      /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,
      ''
    );
  }
}