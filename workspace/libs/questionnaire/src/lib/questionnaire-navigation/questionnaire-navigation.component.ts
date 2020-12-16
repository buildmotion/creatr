import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { QuestionnaireService } from '../questionnaire.service';
import { State } from '@valencia/state-machine';

@Component({
  selector: 'buildmotion-questionnaire-navigation',
  templateUrl: './questionnaire-navigation.component.html',
  styleUrls: ['./questionnaire-navigation.component.scss'],
})
export class QuestionnaireNavigationComponent implements OnInit {
  @Output() next = new EventEmitter<string>();
  @Output() previous = new EventEmitter<string>();

  constructor(private qService: QuestionnaireService) {}

  ngOnInit(): void {}

  onNext() {
    this.next.emit('next');
  }

  onPrevious() {
    this.previous.emit('previous');
  }
}
