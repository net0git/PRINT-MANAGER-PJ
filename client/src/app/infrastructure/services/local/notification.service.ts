import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationState } from '../../../domain/model/notificationState.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

   private stateSubject = new BehaviorSubject<NotificationState>({
    cantidad: 0,
    estado: 'I'
  });

  state$ = this.stateSubject.asObservable();

  setState(state: NotificationState) {
    this.stateSubject.next(state);
  }

    decrementar(): void {
  const state = this.stateSubject.value;

  if (state.cantidad > 0) {
    this.stateSubject.next({
      ...state,
      cantidad: state.cantidad - 1
    });
  }
}

}