import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { ComponentBase } from '@valencia/foundation';
import { LoggingService } from '@valencia/logging';
import { Notification } from './models/notification.model';
import { NotificationService } from './notification.service';
import { NotifierType } from './models/notifier-type.enum';
import { Router } from '@angular/router';

// export class NotificationComponentBase extends ComponentBase implements OnInit, OnDestroy {
export class NotificationComponentBase extends ComponentBase {
  private showNotificationSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly showNotification$: Observable<boolean> = this.showNotificationSubject.asObservable();

  notificationSubject: BehaviorSubject<Notification> = new BehaviorSubject<Notification>(new Notification());
  notification$: Observable<Notification> = this.notificationSubject.asObservable();

  // notificationSubscription: Subscription;

  constructor(componentName: string, private notifications: NotificationService, loggingService: LoggingService, router: Router) {
    super(componentName, loggingService, router);
    this.initialize();
  }

  initialize() {
    // this.notificationSubscription = this.notifications.notifications$.subscribe((notification) => {
    this.notifications.notifications$.subscribe((notification) => {
      if (notification) {
        if (notification.notifierType === NotifierType.Banner) {
          this.notificationSubject.next(notification);
        }
      } else {
        this.notificationSubject.next(notification); // null;
        this.showNotificationSubject.next(false);
      }
    });
  }

  // ngOnDestroy(): void {
  //   if (this.notificationSubscription) {
  //     this.notificationSubscription.unsubscribe();
  //   }
  // }
}
