import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CreateAccountUIService {
  private hasErrorsSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isAccountCreatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isProcessingAccountSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public readonly hasErrors$: Observable<boolean> = this.hasErrorsSubject.asObservable();
  public readonly isAccountCreated$: Observable<boolean> = this.isAccountCreatedSubject.asObservable();
  public readonly isProcessingAccount$: Observable<boolean> = this.isProcessingAccountSubject.asObservable();

  constructor() {}
}
