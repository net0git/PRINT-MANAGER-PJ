import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UiService {

 // Un BehaviorSubject es como una variable "viva" que avisa cuando cambia
  private cargandoSource = new BehaviorSubject<boolean>(false);
  
  // Este es el que escuchará el Spinner en el HTML
  cargando$ = this.cargandoSource.asObservable();

  mostrarCargando(estado: boolean) {
    this.cargandoSource.next(estado);
  }
  
}
