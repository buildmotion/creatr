# Workspace

This project was generated using [Nx](https://nx.dev). Update your development environment to use Angular 10.

> [https://angular.io/guide/updating-to-version-10](https://angular.io/guide/updating-to-version-10)

## Create Application

Use the Angular CLI to create a new application project.

```ts
ng new application creatr --dry-run
```

Output

```ts
ng g application creatr
? Which stylesheet format would you like to use? SASS(.scss)  [ http://sass-lang.com   ]
? Would you like to configure routing for this application? Yes
DELETE tsconfig.json
CREATE jest.config.js (61 bytes)
CREATE jest.preset.js (82 bytes)
CREATE apps/creatr/tsconfig.editor.json (119 bytes)
CREATE apps/creatr/tsconfig.json (249 bytes)
CREATE apps/creatr/src/favicon.ico (15086 bytes)
CREATE apps/creatr/.browserslistrc (853 bytes)
CREATE apps/creatr/tsconfig.app.json (163 bytes)
CREATE apps/creatr/src/main.ts (377 bytes)
CREATE apps/creatr/src/polyfills.ts (2833 bytes)
CREATE apps/creatr/src/styles.scss (80 bytes)
CREATE apps/creatr/src/assets/.gitkeep (0 bytes)
CREATE apps/creatr/src/environments/environment.prod.ts (52 bytes)
CREATE apps/creatr/src/environments/environment.ts (663 bytes)
CREATE apps/creatr/src/app/app.module.ts (419 bytes)
CREATE apps/creatr/src/app/app.component.html (3017 bytes)
CREATE apps/creatr/src/app/app.component.spec.ts (1022 bytes)
CREATE apps/creatr/src/app/app.component.ts (220 bytes)
CREATE apps/creatr/src/app/app.component.scss (2088 bytes)
CREATE tslint.json (2311 bytes)
CREATE apps/creatr/jest.config.js (741 bytes)
CREATE apps/creatr/tsconfig.spec.json (233 bytes)
CREATE apps/creatr/src/test-setup.ts (30 bytes)
CREATE apps/creatr-e2e/tslint.json (97 bytes)
CREATE apps/creatr-e2e/cypress.json (412 bytes)
CREATE apps/creatr-e2e/tsconfig.e2e.json (222 bytes)
CREATE apps/creatr-e2e/tsconfig.json (147 bytes)
CREATE apps/creatr-e2e/src/fixtures/example.json (80 bytes)
CREATE apps/creatr-e2e/src/integration/app.spec.ts (404 bytes)
CREATE apps/creatr-e2e/src/plugins/index.js (832 bytes)
CREATE apps/creatr-e2e/src/support/app.po.ts (47 bytes)
CREATE apps/creatr-e2e/src/support/commands.ts (1009 bytes)
CREATE apps/creatr-e2e/src/support/index.ts (599 bytes)
UPDATE angular.json (4096 bytes)
UPDATE package.json (2038 bytes)
UPDATE nx.json (641 bytes)
√ Packages installed successfully.
```

### Add Material Design to the Application

Use the CLI to add Material to the application. The schematic will add and update the necessary application files to enable Material Design.

```ts
ng add @angular/material
Installing packages for tooling via yarn.
Installed packages for tooling via yarn.
? Choose a prebuilt theme name, or "custom" for a custom theme: Custom
? Set up global Angular Material typography styles? Yes 
? Set up browser animations for Angular Material? Yes
UPDATE package.json (2104 bytes)
√ Packages installed successfully.
UPDATE apps/creatr/src/app/app.module.ts (528 bytes)
UPDATE apps/creatr/src/styles.scss (1555 bytes)
UPDATE apps/creatr/src/index.html (557 bytes)
```

> Use this tool to create a custom theme for Angular Material
> [https://materialtheme.arcsine.dev/](https://materialtheme.arcsine.dev/)

```ts
ng generate @schematics/angular:module --name=site --no-interactive --dry-run
ng generate @schematics/angular:component --name=modules/site/header --project=creatr --module=modules/site/site.module <

CREATE apps/creatr/src/app/modules/site/header/header.component.html (21 bytes)
CREATE apps/creatr/src/app/modules/site/header/header.component.spec.ts (626 bytes)
CREATE apps/creatr/src/app/modules/site/header/header.component.ts (284 bytes)
CREATE apps/creatr/src/app/modules/site/header/header.component.scss (0 bytes)
UPDATE apps/creatr/src/app/modules/site/site.module.ts (266 bytes)

ng generate @schematics/angular:component --name=modules/site/footer --project=creatr --module=modules/site/site.module

CREATE apps/creatr/src/app/modules/site/footer/footer.component.html (21 bytes)
CREATE apps/creatr/src/app/modules/site/footer/footer.component.spec.ts (626 bytes)
CREATE apps/creatr/src/app/modules/site/footer/footer.component.ts (284 bytes)
CREATE apps/creatr/src/app/modules/site/footer/footer.component.scss (0 bytes)
UPDATE apps/creatr/src/app/modules/site/site.module.ts (344 bytes)

ng generate @schematics/angular:component --name=modules/site/layout --project=creatr --module=modules/site/site.module
CREATE apps/creatr/src/app/modules/site/layout/layout.component.html (21 bytes)
CREATE apps/creatr/src/app/modules/site/layout/layout.component.spec.ts (626 bytes)
CREATE apps/creatr/src/app/modules/site/layout/layout.component.ts (284 bytes)
CREATE apps/creatr/src/app/modules/site/layout/layout.component.scss (0 bytes)
UPDATE apps/creatr/src/app/modules/site/site.module.ts (692 bytes)
```

Create pages:

```ts
ng generate @schematics/angular:module --name=about --project=creatr --module=app.module --no-commonModule --lintFix --route=about --routing

CREATE apps/creatr/src/app/about/about-routing.module.ts (340 bytes)
CREATE apps/creatr/src/app/about/about.module.ts (438 bytes)
CREATE apps/creatr/src/app/about/about.component.html (20 bytes)
CREATE apps/creatr/src/app/about/about.component.spec.ts (619 bytes)
CREATE apps/creatr/src/app/about/about.component.ts (280 bytes)
CREATE apps/creatr/src/app/about/about.component.scss (0 bytes)
UPDATE apps/creatr/src/app/app.module.ts (695 bytes)

ng generate @schematics/angular:module --name=home --project=creatr --module=app.module --no-commonModule --lintFix --route=home --routing
CREATE apps/creatr/src/app/home/home-routing.module.ts (336 bytes)
CREATE apps/creatr/src/app/home/home.module.ts (430 bytes)
CREATE apps/creatr/src/app/home/home.component.html (19 bytes)
CREATE apps/creatr/src/app/home/home.component.spec.ts (612 bytes)
CREATE apps/creatr/src/app/home/home.component.ts (276 bytes)
CREATE apps/creatr/src/app/home/home.component.scss (0 bytes)
UPDATE apps/creatr/src/app/app.module.ts (1176 bytes)
```

Create Routes Module

```ts
ng generate @schematics/angular:module --name=appRoutes --project=creatr --module=app --flat --lintFix --routingScope=Root <

CREATE apps/creatr/src/app/app-routes.module.ts (195 bytes)
UPDATE apps/creatr/src/app/app.module.ts (1293 bytes)
```

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/angular/getting-started/what-is-nx)

[Interactive Tutorial](https://nx.dev/angular/tutorial/01-create-application)

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [Angular](https://angular.io)
  - `ng add @nrwl/angular`
- [React](https://reactjs.org)
  - `ng add @nrwl/react`
- Web (no framework frontends)
  - `ng add @nrwl/web`
- [Nest](https://nestjs.com)
  - `ng add @nrwl/nest`
- [Express](https://expressjs.com)
  - `ng add @nrwl/express`
- [Node](https://nodejs.org)
  - `ng add @nrwl/node`

There are also many [community plugins](https://nx.dev/nx-community) you could add.

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are sharable across libraries and applications. They can be imported from `@workspace/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.

## ☁ Nx Cloud

### Computation Memoization in the Cloud

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
