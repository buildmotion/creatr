import { BehaviorSubject, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { ConfigurationService } from '@valencia/configuration';

@Component({
  selector: 'buildmotion-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent implements OnInit {
  private companyInfoSubject: BehaviorSubject<{ name: string; email: string }> = new BehaviorSubject<{ name: string; email: string }>(undefined);
  public readonly companyInfo$: Observable<{ name: string; email: string }> = this.companyInfoSubject.asObservable();
  constructor(private configService: ConfigurationService) {}

  ngOnInit(): void {
    this.configService.settings$.subscribe((config) => {
      if (config && config.webConfig) {
        this.companyInfoSubject.next({
          name: this.configService.settings.webConfig.companyName,
          email: this.configService.settings.webConfig.email,
        });
      }
    });
  }
}
