import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  dismissAllModals$ = new Subject<void>();
  openModal$ = new Subject<string>();

  constructor() { }

  open(modalName: string): void {
    this.openModal$.next(modalName);
  }

  dismissAll(): void {
    this.dismissAllModals$.next();
  }

}
