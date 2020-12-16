import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { LoggingService, Severity } from '@valencia/logging';

import { ComponentBase } from '@valencia/foundation';
import { QuestionnaireService } from './questionnaire.service';

/**
 * The [QuestionnaireService] is provided/scoped to an instance of the QuestionnaireComponent. It will
 * use the specified questionnaire [name] to retrieve the specified configuration.
 */
@Component({
  selector: 'buildmotion-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
  providers: [QuestionnaireService],
})
export class QuestionnaireComponent extends ComponentBase implements OnInit {
  questionnaireName: string;

  constructor(
    @Inject(QuestionnaireService) private qService: QuestionnaireService,
    private route: ActivatedRoute,
    loggingService: LoggingService,
    router: Router
  ) {
    super('QuestionnaireComponent', loggingService, router);
  }

  ngOnInit(): void {
    this.retrieveQuestionnaireName();
    this.qService.initializeQ(`q/${this.questionnaireName}`);
  }

  onNext($event) {
    this.qService.transition($event);
  }

  onPrevious($event) {
    this.qService.transition($event);
  }

  private retrieveQuestionnaireName() {
    try {
      this.loggingService.log(this.componentName, Severity.Information, `Preparing to retrieve [name] for questionnaire.`);
      this.questionnaireName = this.route.snapshot.paramMap.get('name');
      this.loggingService.log(this.componentName, Severity.Information, `Questionnaire name is [${this.questionnaireName}].`);
    } catch (error) {
      this.logError(error, `Error while attempting to retrieve [name] from route.`);
    }
  }
}
