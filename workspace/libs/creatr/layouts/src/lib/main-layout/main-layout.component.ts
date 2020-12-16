import { BehaviorSubject, Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ConfigurationService, IConfiguration } from '@valencia/configuration';
import { map, shareReplay } from 'rxjs/operators';

import { Component } from '@angular/core';

@Component({
  selector: 'buildmotion-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  private appNameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public readonly appName$: Observable<string> = this.appNameSubject.asObservable();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  constructor(private breakpointObserver: BreakpointObserver, private configService: ConfigurationService) {
    this.configService.settings$.subscribe((config) => {
      if (config && config.webConfig) {
        this.appNameSubject.next(config.webConfig.applicationName);
      }
    });
  }
}
