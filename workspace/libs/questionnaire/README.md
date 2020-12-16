# Questionnaire Micro-App Library

## Create Components

###

Use the CLI or Nx Console to create the new micro-application for the workspace. This will allow any of the application to load/use the micro-app directly.

```ts
ng generate @nrwl/angular:library --name=questionnaire --style=scss --importPath=@valencia/questionnaires --lazy --linter=eslint --routing --simpleModuleName --no-interactive

CREATE libs/questionnaire/.eslintrc.json (80 bytes)
CREATE libs/questionnaire/README.md (150 bytes)
CREATE libs/questionnaire/tsconfig.lib.json (462 bytes)
CREATE libs/questionnaire/src/index.ts (44 bytes)
CREATE libs/questionnaire/src/lib/questionnaire.module.ts (341 bytes)
CREATE libs/questionnaire/tsconfig.json (197 bytes)
CREATE libs/questionnaire/jest.config.js (724 bytes)
CREATE libs/questionnaire/tsconfig.spec.json (233 bytes)
CREATE libs/questionnaire/src/test-setup.ts (30 bytes)
UPDATE angular.json (30804 bytes)
UPDATE nx.json (1697 bytes)
UPDATE tsconfig.base.json (1701 bytes)
UPDATE jest.config.js (774 bytes)
```

The questionnaire application should support the majority of the HTML input types

> See https://www.w3schools.com/html/html_form_input_types.asp

## Create Components

### Questionnaire

Created a top-level flat component - entry component for the questionnaire micro-app.

```ts
ng generate @schematics/angular:component --name=questionnaire --project=questionnaire --module=questionnaire.module --style=scss --displayBlock --flat

CREATE libs/questionnaire/src/lib/questionnaire.component.html (28 bytes)
CREATE libs/questionnaire/src/lib/questionnaire.component.spec.ts (675 bytes)
CREATE libs/questionnaire/src/lib/questionnaire.component.ts (312 bytes)
CREATE libs/questionnaire/src/lib/questionnaire.component.scss (28 bytes)
UPDATE libs/questionnaire/src/lib/questionnaire.module.ts (451 bytes)
```

### Questionnaire Item (SCAM)

```ts
ng generate @schematics/angular:module --name=questionnaireItem --project=questionnaire --module=questionnaire.module --route=questionnaire-item --routing <

CREATE libs/questionnaire/src/lib/questionnaire-item/questionnaire-item-routing.module.ts (389 bytes)
CREATE libs/questionnaire/src/lib/questionnaire-item/questionnaire-item.module.ts (601 bytes)
CREATE libs/questionnaire/src/lib/questionnaire-item/questionnaire-item.component.html (33 bytes)
CREATE libs/questionnaire/src/lib/questionnaire-item/questionnaire-item.component.spec.ts (704 bytes)
CREATE libs/questionnaire/src/lib/questionnaire-item/questionnaire-item.component.ts (331 bytes)
CREATE libs/questionnaire/src/lib/questionnaire-item/questionnaire-item.component.scss (0 bytes)
UPDATE libs/questionnaire/src/lib/questionnaire.module.ts (596 bytes)
```

Add components to display the question and to collect the response.

#### Question

```ts
ng generate @schematics/angular:component --name=questionnaire-item/question --project=questionnaire --module=questionnaire-item.module --style=scss --displayBlock

CREATE libs/questionnaire/src/lib/questionnaire-item/question/question.component.html (23 bytes)
CREATE libs/questionnaire/src/lib/questionnaire-item/question/question.component.spec.ts (640 bytes)
CREATE libs/questionnaire/src/lib/questionnaire-item/question/question.component.ts (292 bytes)
CREATE libs/questionnaire/src/lib/questionnaire-item/question/question.component.scss (28 bytes)
UPDATE libs/questionnaire/src/lib/questionnaire-item/questionnaire-item.module.ts (687 bytes)
```

#### Answer Options and/or Data Input

```ts
ng generate @schematics/angular:component --name=questionnaire-item/answer --project=questionnaire --module=questionnaire-item.module --style=scss --displayBlock

CREATE libs/questionnaire/src/lib/questionnaire-item/answer/answer.component.html (21 bytes)
CREATE libs/questionnaire/src/lib/questionnaire-item/answer/answer.component.spec.ts (626 bytes)
CREATE libs/questionnaire/src/lib/questionnaire-item/answer/answer.component.ts (284 bytes)
CREATE libs/questionnaire/src/lib/questionnaire-item/answer/answer.component.scss (28 bytes)
UPDATE libs/questionnaire/src/lib/questionnaire-item/questionnaire-item.module.ts (765 bytes)
```

### Update Default Route

Update the default route to load the target module.

```ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuestionnaireComponent } from './questionnaire.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', loadChildren: () => import('./questionnaire-item/questionnaire-item.module').then((m) => m.QuestionnaireItemModule) },
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
  declarations: [QuestionnaireComponent],
})
export class QuestionnaireModule {}
```

## Add UI Service

The UI service will use the state machine library to manage the questionnaire flow.

```ts
ng g s questionnaire-item/questionnaire-item-ui --project=questionnaire --skip-tests
CREATE libs/questionnaire/src/lib/questionnaire-item/questionnaire-item-ui.service.ts (148 bytes)``
```

## Create Question Components

```ts
ng generate @schematics/angular:module --name=contactInfo --project=questionnaire --module=questionnaire.module --route=contact-info

CREATE libs/questionnaire/src/lib/contact-info/contact-info.module.ts (449 bytes)
CREATE libs/questionnaire/src/lib/contact-info/contact-info.component.html (27 bytes)
CREATE libs/questionnaire/src/lib/contact-info/contact-info.component.spec.ts (662 bytes)
CREATE libs/questionnaire/src/lib/contact-info/contact-info.component.ts (307 bytes)
CREATE libs/questionnaire/src/lib/contact-info/contact-info.component.scss (0 bytes)
UPDATE libs/questionnaire/src/lib/questionnaire.module.ts (1219 bytes)
```

```ts
ng generate @schematics/angular:module --name=verifAccount --project=questionnaire --module=questionnaire.module --route=verify-account

CREATE libs/questionnaire/src/lib/verif-account/verif-account.module.ts (454 bytes)
CREATE libs/questionnaire/src/lib/verif-account/verif-account.component.html (28 bytes)
CREATE libs/questionnaire/src/lib/verif-account/verif-account.component.spec.ts (669 bytes)
CREATE libs/questionnaire/src/lib/verif-account/verif-account.component.ts (311 bytes)
CREATE libs/questionnaire/src/lib/verif-account/verif-account.component.scss (0 bytes)
UPDATE libs/questionnaire/src/lib/questionnaire.module.ts (1357 bytes)
```

## Nx

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test questionnaire` to execute the unit tests.
