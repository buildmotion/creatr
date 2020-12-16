# Schematic Tools

## What is a Schematic?

A schematic is a mechanism to generate, modify, or remove code within the workspace. Typically, the commands are executed from the Angular CLI. Most schematics will use a template along with options to customize the output. The template contains placeholders for different string utilities and other processing logic. A target schematic may make use of other schematics and will also process a series of rules during the execution. If any rule fails during the process, no system file changes are made - the execution will fail gracefully and provide error messages.

As with most CLI commands, use the `--dry-run` option to perform a test run of the schematic without any system file changes. This gives you an opportunity to see the output or results.

Simply put, the built-in Schematics engine is a code generator that takes options (i.e., input) and will apply the schematic logic against one or more templates to produce output in the form of code in files. It is really much more because is can modify and remove code as well. It is a rule-based engine and relies on some conventional design patterns. It is an amazing piece of software - a framework and a set of schematics

## How to Create a New Nx Schematic

> Note: If you do it twice, make it nice. Automate it.

One of the architecture patterns that I use contains a _UI Service_ that works as an adaptor or mediator between UI/UX concerns and the actual business domain of the application. For example, I have an application feature that is dealing with a questionnaire. The `QuestionnaireItemComponent` will use an `@Injectable` service - a UI Service called `QuestionnaireItemUIService`. I would like to automate the creation of the UI service using a Schematic to make the my developer workflow more efficient - but to also to make it easy for other developers to use and implement this pattern.

```ts
import { Injectable } from '@angular/core';
import { LoggingService } from '@valencia/logging';
import { ServiceBase } from '@valencia/foundation';

@Injectable()
export class QuestionnaireItemUIService extends ServiceBase {
  constructor(loggingService: LoggingService) {
    super('QuestionnaireItemUIService', loggingService);
  }
}
```

### Prerequisites

You will need to install and use the Nx developer tools - packages from [Nrwl.io](https://www.Nrwl.io) that make working with an Angular Workspace way too easy.

- [https://nx.dev/angular](https://nx.dev/angular)

Create a new workspace. Remember this is not a single project. You are creating a _workspace_ environment that has the capability of managing multiple projects of different types in the same folder location (see the [Workspace](https://angular.io/guide/file-structure). The Nx Workspace is an enhancement that provides additional capabilities and a more conventional folder structure to manage multiple projects as well as other tools like Schematics - more on that later.

- Angular application
- Angular library
- Node Library
- NestJS application
- Schematic Library

```ts
npx create-nx-workspace@latest
```

Once, you have an Nx Workspace, you are ready to begin the journey.

### Getting Started

Make sure to install these packages as _devDependencies_. They contain utilities and other resources required to create and use custom Schematics.

- @angular-devkit/core
- @angular-devkit/schematics
- @schematics/angular

### Use A Schematic to Create a Schematic

Use the `workspace-schematic` schematic contained in the `@nrwl/workspace` package. You should already have this installed if you are using the Nx Workspace. Here is the syntax for creating a new local schematic in your Angular workspace.

```ts
nx generate @nrwl/workspace:workspace-schematic <YOUR-SCHEMATIC-NAME-HERE>
```

Create a simple schematic called `ui-service` using the CLI.

```ts
nx generate @nrwl/workspace:workspace-schematic ui-service --dry-run
```

The output of the CLI command is (remove `--dry-run` to create the files):

```ts
nx generate @nrwl/workspace:workspace-schematic ui-service --dry-run
CREATE tools/schematics/ui-service/index.ts (232 b
CREATE tools/schematics/ui-service/schema.json (293 bytes)
```

The basics are created.

- index: the entry point for the specified schematic.
- schema: defines the options the schematic will use to customize the processing and output

```ts
ui-service
 ┣ index.ts
 ┗ schema.json
```

### Schematic Index

There's not much here for now - but it's a good start.

```ts
import { chain, externalSchematic, Rule } from '@angular-devkit/schematics';

export default function (schema: any): Rule {
  return chain([
    externalSchematic('@nrwl/workspace', 'lib', {
      name: schema.name,
    }),
  ]);
}
```

#### Customize the Schematic Logic

Most schematics will create something. This means that the output will have to have some target location or project that the files will become part of. Therefore, we'll need a way to provide the path information or derive it from some other information (e.g., the target _project_). We'll need to update the processing logic.

> Note: The required packages. Make sure that your workspace has these packages
> installed as _devDependencies_.
>
> - @angular-devkit/core
> - @angular-devkit/schematics
> - @schematics/angular

There is nothing wrong from borrowing or stealing something that works, right? Since, our target is a _class_, we can leverage an existing schematic that does the same thing.

> Use the following schematic to create a class file based on your custom template. It
> is a direct copy from the @schematics/angular _class_ schematic.

```ts
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { strings } from '@angular-devkit/core';
import { Rule, Tree, apply, applyTemplates, chain, filter, mergeWith, move, noop, url } from '@angular-devkit/schematics';
import { applyLintFix } from '../utility/lint-fix';
import { parseName } from '../utility/parse-name';
import { createDefaultPath } from '../utility/workspace';
import { Schema as ClassOptions } from './schema';

export default function (options: ClassOptions): Rule {
  return async (host: Tree) => {
    if (options.path === undefined) {
      options.path = await createDefaultPath(host, options.project as string);
    }

    options.type = !!options.type ? `.${options.type}` : '';

    const parsedPath = parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;

    const templateSource = apply(url('./files'), [
      options.skipTests ? filter((path) => !path.endsWith('.spec.ts.template')) : noop(),
      applyTemplates({
        ...strings,
        ...options,
      }),
      move(parsedPath.path),
    ]);

    return chain([mergeWith(templateSource), options.lintFix ? applyLintFix(options.path) : noop()]);
  };
}
```

You might be wondering where did I get this code or know what to do? There are dozens or hundreds of Schematic implementations within our development environment - especially if we are using the Angular CLI. If you want to create a schematic for a simple class, you can view the following resources

- node_modules: `node_modules\@schematics\angular\class\index.js`
- npmjs.com: [https://www.npmjs.com/package/@schematics/angular](https://www.npmjs.com/package/@schematics/angular)
- GitHub.com: [https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/class/index.ts](https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/class/index.ts)

The schematics eco-system will also allow you to execute/use existing Schematics. This is a great opportunity to use and compose your Schematic project solution by using what already exists.

The schematic (copied) has relative paths to some of the utility functions that we will need. Since we do not have the entire project - we need to get a more practical reference to these resources. It is not a good idea to copy and paste all of them into our solution. We do not need to because they are provided by other packages that we can import.

```ts
import { applyLintFix } from '../utility/lint-fix';
import { parseName } from '../utility/parse-name';
import { createDefaultPath } from '../utility/workspace';
import { Schema as ClassOptions } from './schema';
```

The different utilities and resources for Schematics has matured to point that many of these are now part of published packages that we can now import and use. Nice! Update the import statements for the following items below.

```ts
import { applyLintFix } from '@schematics/angular/utility/lint-fix';
import { createDefaultPath } from '@schematics/angular/utility/workspace';
import { parseName } from '@schematics/angular/utility/parse-name';
```

Now that we have our Schematic logic setup, we can work on the options for the schematic.

### Schematic Schema (Options)

Most schematic have options that allow them to be customized. Some of the customizations are name, location of files, file names, project target, or other options like whether to include a `*.spect.ts` file for testing. The _default_ schema generated for our Schematic project has a `name` property. Pretty lonely, I would say.

```json
{
  "$schema": "http://json-schema.org/schema",
  "id": "ui-service",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Library name",
      "$default": {
        "$source": "argv",
        "index": 0
      }
    }
  },
  "required": ["name"]
}
```

#### Customize the Options

I copied the options from the [class schema in the @schematics/angular package on Github](https://github.com/angular/angular-cli/edit/master/packages/schematics/angular/class/schema.json).

```ts
https://github.com/angular/angular-cli/edit/master/packages/schematics/angular/class/schema.json
```

Now we have a whole set of schematic options to make the customization experience more enjoyable. I modified the _default_ value for `skipTests` to _false_.

```json
{
  "$schema": "http://json-schema.org/schema",
  "id": "SchematicsAngularClass",
  "title": "Angular Class Options Schema",
  "type": "object",
  "description": "Creates a new generic class definition in the given or default project.",
  "properties": {
    "name": {
      "type": "string",
      "description": "The name of the new class.",
      "$default": {
        "$source": "argv",
        "index": 0
      },
      "x-prompt": "What name would you like to use for the class?"
    },
    "path": {
      "type": "string",
      "format": "path",
      "description": "The path at which to create the class, relative to the workspace root.",
      "visible": false
    },
    "project": {
      "type": "string",
      "description": "The name of the project.",
      "$default": {
        "$source": "projectName"
      }
    },
    "skipTests": {
      "type": "boolean",
      "description": "When true, does not create \"spec.ts\" test files for the new class.",
      "default": true,
      "x-user-analytics": 12
    },
    "type": {
      "type": "string",
      "description": "Adds a developer-defined type to the filename, in the format \"name.type.ts\".",
      "default": ""
    },
    "lintFix": {
      "type": "boolean",
      "default": false,
      "description": "When true, applies lint fixes after generating the class.",
      "x-user-analytics": 15,
      "x-deprecated": "Use \"ng lint --fix\" directly instead."
    }
  },
  "required": ["name"]
}
```

Notice that the published schematic in our node_modules folder has a Type definition file.

> node_modules\@schematics\angular\class

```text
class
 ┣ files
 ┃ ┣ __name@dasherize____type__.spec.ts.template
 ┃ ┗ __name@dasherize____type__.ts.template
 ┣ index.d.ts
 ┣ index.js
 ┣ schema.d.ts
 ┣ schema.js
 ┗ schema.json
```

The Type definition file allows for strong-typing within our `index.ts` file. A better developer experience when developing custom schematic projects. There is an easy way to create these files for your custom schematics.

```ts
import { Schema as ClassOptions } from './schema';
export default function (options: ClassOptions): Rule {
  /*...*/
}
```

The published _class_ schematic shows the typed import statement for the Schema options.

```ts
// node_modules\@schematics\angular\class\index.d.ts
import { Rule } from '@angular-devkit/schematics';
import { Schema as ClassOptions } from './schema';
export default function (options: ClassOptions): Rule;
```

We could use the `schema.d.ts` file from the node_modules. However, I think it is good to know how to build your own especially when you really want to customize the options for a tailored schematic.

```ts
// node_modules\@schematics\angular\class\schema.d.ts
/**
 * Creates a new generic class definition in the given or default project.
 */
export interface Schema {
  /**
   * When true, applies lint fixes after generating the class.
   */
  lintFix?: boolean;
  /**
   * The name of the new class.
   */
  name: string;
  /**
   * The path at which to create the class, relative to the workspace root.
   */
  path?: string;
  /**
   * The name of the project.
   */
  project?: string;
  /**
   * When true, does not create "spec.ts" test files for the new class.
   */
  skipTests?: boolean;
  /**
   * Adds a developer-defined type to the filename, in the format "name.type.ts".
   */
  type?: string;
}
```

Use the following package and CLI command to create this file for you based on the information in the existing `schema.json` file. The output is a `schema.d.ts` file. You can use this pattern for any future custom schematic projects. Open a terminal to the location of your `schema.json` file and run the command:

```ts
npx -p dtsgenerator dtsgen schema.json -o schema.d.ts
```

The command will create a typed interface file based on the defined options in the target `schema.json` file.

```ts
/**
 * Angular Class Options Schema
 * Creates a new generic class definition in the given or default project.
 */
declare interface SchematicsAngularClass {
  /**
   * The name of the new class.
   */
  name: string;
  /**
   * The path at which to create the class, relative to the workspace root.
   */
  path?: string; // path
  /**
   * The name of the project.
   */
  project?: string;
  /**
   * When true, does not create "spec.ts" test files for the new class.
   */
  skipTests?: boolean;
  /**
   * Adds a developer-defined type to the filename, in the format "name.type.ts".
   */
  type?: string;
  /**
   * When true, applies lint fixes after generating the class.
   */
  lintFix?: boolean;
}
```

Update the class from `declare` to `export`. This will fix the `index.ts` import and usage in the constructor. I also update the name of the interface to `UIServiceOptions`.

```ts
// declare interface SchematicsAngularClass {
export interface UIServiceOptions {
```

Now we have the schematic logic and options ready to go.

### Schematic Templates - Just Files

As mentioned, most schematics will generate or create something for your projects. Most of the time, the output is based on templates. Notice that in our index that we have a reference to _templateSource_ that is looking into a `./files` folder. By convention, we can put our templates into a `files` folder and the schematic will use these when the schematic is executed.

```ts
const templateSource = apply(url('./files'), [
  options.skipTests ? filter((path) => !path.endsWith('.spec.ts.template')) : noop(),
  applyTemplates({
    ...strings,
    ...options,
  }),
  move(parsedPath.path),
]);
```

#### Template Source

For our example, we want to create a UI Service using a Schematic. We will want to customize the name, the location or project that it belongs to, and perhaps include a specification file for testing. Here is our target source code - we can use an existing implementation from one of our projects.

```ts
import { Injectable } from '@angular/core';
import { LoggingService } from '@valencia/logging';
import { ServiceBase } from '@valencia/foundation';

@Injectable()
export class QuestionnaireItemUIService extends ServiceBase {
  constructor(loggingService: LoggingService) {
    super('QuestionnaireItemUIService', loggingService);
  }
}
```

#### Files Folder and Template Files

Create a folder and (2) files for the templates. Notice that even the file names can be customized in our Schematic. This is an example of using the `dasherize` utility on the `name` option that is passed on the CLI command. The syntax looks odd, but it works: `__name@dasherize__`.

- the utility operation is surrounded by `__`.
- the operation and target is reversed: name --> @dasherize
  - it is logically the same as `dasherize(name)` in code, but this is a file name

```text
files
 ┣ __name@dasherize__-ui.service.spec.ts.template
 ┗ __name@dasherize__-ui.service.ts.template
```

#### Service Template

Update the templates with `<%= %>` using the _name_ option and a new string utility called `classify()`. The service template is pretty simple - you just fine what needs to be customized and then use the string utilities on the options passed in.

```ts
import { Injectable } from '@angular/core';
import { LoggingService } from '@valencia/logging';
import { ServiceBase } from '@valencia/foundation';

@Injectable()
export class <%= classify(name) %>UIService extends ServiceBase {
  constructor(loggingService: LoggingService) {
    super('<%= classify(name) %>UIService', loggingService);
  }
}
```

The specification file template uses the _dasherize_ and _classify_ string functions. This template is used to create a specification file only when the _skipTests_ (e.g., `--skip-tests`) is true. Use `--skip-tests=false` to not include any specification file.

The schematic processing logic uses the options to make decisions on what to include in the output.

```ts
options.skipTests ? filter((path) => !path.endsWith('.spec.ts.template')) : noop(),
```

Update the the specification file template to the following:

```ts
import { TestBed } from '@angular/core/testing';

import { <%= classify(name) %>UIService } from './<%= dasherize(name) %>.service';

describe('<%= classify(name) %>UIService', () => {
  let service: <%= classify(name) %>UIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(<%= classify(name) %>UIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
```

### Generate Some Code with Your Template

Use the CLI to run the custom Nx schematic - note, that this is a local schematic that did not require you to build and/or publish it before it could be used. You can develop and test in the same workspace. If you are using Git, you have the option of not committing any file changes.

```ts
yarn run workspace-schematic ui-service home/home --project=creatr --dry-run
```

The output in the terminal will be:

```ts
yarn run workspace-schematic ui-service home/home --project=creatr
yarn run v1.22.0
$ nx workspace-schematic ui-service home/home --project=creatr
$ B:\gitlab\angular-workspace\workspace\node_modules\.bin\tsc -p B:\gitlab\angular-workspace\workspace\tools\tsconfig.generated.json

>  NX  Executing your local schematic: ui-service

CREATE apps/creatr/src/app/home/home-ui.service.spec.ts (371 bytes)
CREATE apps/creatr/src/app/home/home-ui.service.ts (318 bytes)
```

## Create Application Component

```ts
yarn run workspace-schematic app-component video --project=creatr --module=app.module --dry-run
yarn run v1.22.0
$ nx workspace-schematic app-component video --project=creatr --module=app.module --dry-run
$ B:\gitlab\angular-workspace\workspace\node_modules\.bin\tsc -p B:\gitlab\angular-workspace\workspace\tools\tsconfig.generated.json

>  NX  Executing your local schematic: app-component

CREATE apps/creatr/src/app/video/video.component.html (21 bytes)
CREATE apps/creatr/src/app/video/video.component.spec.ts (646 bytes)
CREATE apps/creatr/src/app/video/video.component.ts (572 bytes)
CREATE apps/creatr/src/app/video/video.component.scss (0 bytes)
UPDATE apps/creatr/src/app/app.module.ts (1015 bytes)
```

## Create a Custom Library Project

### Use Angular/Nx CLI

Normally, we could use the CLI to create the library project. The CLI command will create the new project and use the specified options. This schematic will do the following:

1. create a new library project and update the workspace files with configuration and information about the new project (i.e., angular.json, nx.json, etc.)
2. creates a module in the library
3. creates an `index.ts` barrel file to _export_ items - expose and make available to consumers of the library.
4. testing configuration using `jest.config.js`

```ts
ng generate @nrwl/angular:library --directory=creatr --importPath=@valencia/creatr/video --name=video --no-interactive --simpleModuleName --style=scss --dry-run

CREATE libs/creatr/video/README.md (148 bytes)
CREATE libs/creatr/video/tsconfig.lib.json (465 bytes)
CREATE libs/creatr/video/tslint.json (257 bytes)
CREATE libs/creatr/video/src/index.ts (36 bytes)
CREATE libs/creatr/video/src/lib/video.module.ts (161 bytes)
CREATE libs/creatr/video/tsconfig.json (200 bytes)
CREATE libs/creatr/video/jest.config.js (728 bytes)
CREATE libs/creatr/video/tsconfig.spec.json (236 bytes)
CREATE libs/creatr/video/src/test-setup.ts (30 bytes)
UPDATE angular.json (29030 bytes)
UPDATE nx.json (1603 bytes)
UPDATE tsconfig.base.json (1559 bytes)
UPDATE jest.config.js (666 bytes)
```

### Use Custom Schematic Project

This is a great start and is very efficient. However, the domain library project requires a _Service_ class to act as the API for the library. Also, there is some of boiler-plate code to setup the business logic layer of the library. The domain library will contain an HTTP repository class to abstract the HTTP calls to external API data operations.

Use an existing schematic or schematics to compose your new custom library.

> Example: create a new domain library for an application. The domain library
> will provide a service (API endpoints) for a consumer to interact with. The
> library will encapsulate all of the business logic (i.e., validation, business
> rules, etc.). It will also be responsible for initiating any data operations
> with back end API using HTTP.

```ts
externalSchematic('@nrwl/angular', 'library', {
```

Find the package in [npmjs.com](https://www.npmjs.com/package/@nrwl/angular).

- https://www.npmjs.com/package/@nrwl/angular

Use the link in the package details to locate the code repository.

https://github.com/nrwl/nx/tree/master/packages/angular/src/schematics/library

#### Run the existing Schematic project.

```ts
yarn run workspace-schematic domain-library --directory=creatr --importPath=@valencia/creatr/video --name=video --dry-run
```

### Angular 10 Changes - Error to tsconfig path

> Error: \$ B:\gitlab\angular-workspace\workspace\node_modules\.bin\tsc -p B:\gitlab\angular-workspace\workspace\tools\tsconfig.generated.json
> error TS5083: Cannot read file 'B:/gitlab/angular-workspace/workspace/tsconfig.json'.

Update the path that points to the workspace root-level `tsconfig` file (e.g., `tsconfig.base.json`).

```json
// tools\tsconfig.tools.json
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "../dist/out-tsc/tools",
    "rootDir": ".",
    "module": "commonjs",
    "target": "es5",
    "types": ["node"]
  },
  "include": ["**/*.ts"]
}
```

Attempt to run again:

```ts
yarn run workspace-schematic domain-library --directory=creatr --importPath=@valencia/creatr/video --name=video --dry-run
yarn run v1.22.0
$ nx workspace-schematic domain-library --directory=creatr --importPath=@valencia/creatr/video --name=video --dry-run
$ B:\gitlab\angular-workspace\workspace\node_modules\.bin\tsc -p B:\gitlab\angular-workspace\workspace\tools\tsconfig.generated.json

>  NX  Executing your local schematic: domain-library

? Which stylesheet format would you like to use? SASS(.scss)  [ http://sass-lang.com   ]
CREATE libs/creatr/video/README.md (148 bytes)
CREATE libs/creatr/video/tsconfig.lib.json (465 bytes)
CREATE libs/creatr/video/tslint.json (257 bytes)
CREATE libs/creatr/video/src/index.ts (36 bytes)
CREATE libs/creatr/video/src/lib/video.module.ts (161 bytes)
CREATE libs/creatr/video/tsconfig.json (200 bytes)
CREATE libs/creatr/video/jest.config.js (728 bytes)
CREATE libs/creatr/video/tsconfig.spec.json (236 bytes)
CREATE libs/creatr/video/src/test-setup.ts (30 bytes)
UPDATE angular.json (29030 bytes)
UPDATE nx.json (1603 bytes)
UPDATE tsconfig.base.json (1560 bytes)
UPDATE jest.config.js (666 bytes)

NOTE: The "dryRun" flag means no changes were made.
```

### Add Service Schematic

Run the command and remove the `--dry-run` option. This will create the project and allow us to add additional items to the Schematic. Create a CLI command that will generate the service.

```ts
ng generate @schematics/angular:service --name=video --project=creatr-video --skipTests --no-interactive --dry-run
```

Update the Domain-Library Schematic

```ts
// ng generate @schematics/angular:service --name=video --project=creatr-video --skipTests --no-interactive --dry-run
externalSchematic('@schematics/angular', 'service', {
name: options.name,
project: `${options.directory}-${options.name}`,
skipTests: true,
noInteractive: true,
}),
```

> Note: remove the changes from running the previous version of the schematic.

Run the command again - this time notice that a `video.service` is generated. See: `CREATE libs/creatr/video/src/lib/video.service.ts (134 bytes)`

```ts
yarn run workspace-schematic domain-library --directory=creatr --importPath=@valencia/creatr/video --name=video --dry-run
yarn run v1.22.0
$ nx workspace-schematic domain-library --directory=creatr --importPath=@valencia/creatr/video --name=video --dry-run
$ B:\gitlab\angular-workspace\workspace\node_modules\.bin\tsc -p B:\gitlab\angular-workspace\workspace\tools\tsconfig.generated.json

>  NX  Executing your local schematic: domain-library

? Which stylesheet format would you like to use? SASS(.scss)  [ http://sass-lang.com   ]
CREATE libs/creatr/video/README.md (148 bytes)
CREATE libs/creatr/video/tsconfig.lib.json (465 bytes)
CREATE libs/creatr/video/tslint.json (257 bytes)
CREATE libs/creatr/video/src/index.ts (36 bytes)
CREATE libs/creatr/video/src/lib/video.module.ts (161 bytes)
CREATE libs/creatr/video/tsconfig.json (200 bytes)
CREATE libs/creatr/video/jest.config.js (728 bytes)
CREATE libs/creatr/video/tsconfig.spec.json (236 bytes)
CREATE libs/creatr/video/src/test-setup.ts (30 bytes)
CREATE libs/creatr/video/src/lib/video.service.ts (134 bytes)
UPDATE angular.json (29030 bytes)
UPDATE nx.json (1603 bytes)
UPDATE tsconfig.base.json (1560 bytes)
UPDATE jest.config.js (666 bytes)
```

We can also use a custom schematic to add additional files and to create a custom service using a different template. The `schematic('domain-service', {})` operation will use a local schematic based on the name/path (i.e., _domain-service_).

> This implementation was based on the existing Angular Schematic for a Service.
>
> - [npmjs.com](https://www.npmjs.com/package/@schematics/angular)
> - [Github](https://github.com/angular/angular-cli/tree/master/packages/schematics/angular/service)

The `domain-library` is updated to use the local custom schematic.

```ts
schematic('domain-service', {
      name: dasherize(options.name),
      path: `libs/${options.directory}/${options.name}`,
      project: `${dasherize(options.directory)}-(${dasherize(options.name)}`,
      flat: true,
      skipTests: true,
    }),
```

The local `domain-service` schematic includes all of the boiler-plate templates.

```text
┣ business/
┃ ┣ actions/
┃ ┃ ┗ business-action-base.ts.template
┃ ┣ business-provider.service.spec.ts.template
┃ ┣ business-provider.service.ts.template
┃ ┣ http-__name@dasherize__-repository.service.spec.ts.template
┃ ┣ http-__name@dasherize__-repository.service.ts.template
┃ ┣ i-business-provider.service.ts.template
┃ ┗ i-http-__name@dasherize__-repository.service.ts.template
┗ __name@dasherize@if-flat__/
  ┣ __name@dasherize__.service.spec.ts.template
  ┗ __name@dasherize__.service.ts.template
```

The output and setup of a domain library service is very efficient with the custom Schematic project. Otherwise, it could take a 2-4 hours for a developer to get this project setup and ready for development. Running the schematic will create the domain library in about 10 seconds.

```ts
yarn run workspace-schematic domain-library --directory=creatr --importPath=@valencia/creatr/video --name=video --dry-run
yarn run v1.22.0
$ nx workspace-schematic domain-library --directory=creatr --importPath=@valencia/creatr/video --name=video --dry-run
$ B:\gitlab\angular-workspace\workspace\node_modules\.bin\tsc -p B:\gitlab\angular-workspace\workspace\tools\tsconfig.generated.json

>  NX  Executing your local schematic: domain-library

? Which stylesheet format would you like to use? SASS(.scss)  [ http://sass-lang.com   ]
CREATE libs/creatr/video/README.md (148 bytes)
CREATE libs/creatr/video/tsconfig.lib.json (465 bytes)
CREATE libs/creatr/video/tslint.json (257 bytes)
CREATE libs/creatr/video/src/index.ts (36 bytes)
CREATE libs/creatr/video/src/lib/video.module.ts (161 bytes)
CREATE libs/creatr/video/tsconfig.json (200 bytes)
CREATE libs/creatr/video/jest.config.js (728 bytes)
CREATE libs/creatr/video/tsconfig.spec.json (236 bytes)
CREATE libs/creatr/video/src/test-setup.ts (30 bytes)
CREATE libs/creatr/video/video.service.ts (672 bytes)
CREATE libs/creatr/video/business/business-provider.service.ts (1053 bytes)
CREATE libs/creatr/video/business/http-video-repository.service.ts (1223 bytes)
CREATE libs/creatr/video/business/i-business-provider.service.ts (254 bytes)
CREATE libs/creatr/video/business/i-http-video-repository.service.ts (192 bytes)
CREATE libs/creatr/video/business/actions/business-action-base.ts (1233 bytes)
UPDATE angular.json (29030 bytes)
UPDATE nx.json (1603 bytes)
UPDATE tsconfig.base.json (1560 bytes)
UPDATE jest.config.js (666 bytes)
```

## Required Dependencies/Packages

```ts
yarn add @schematics/angular -D
yarn add @angular-devkit/core -D
yarn add @angular-devkit/schematics -D
yarn add @angular-devkit/schematics-cli -D
```

- @angular-devkit/core
  - string utility functions
- @angular-devkit/schematics
  - Rule,
  - Tree,
  - apply,
  - applyTemplates,
  - chain,
  - filter,
  - mergeWith,
  - move,
  - noop,
  - url
- @schematics/angular/utility
  - applyLintFix
  - parseName
  - createDefaultPath

## Create Options for Schematic

### Generate Typed Definition

```ts
npx -p dtsgenerator dtsgen schema.json -o schema.d.ts
```

## Add Business Action to Domain Library

Syntax:

```ts
yarn run workspace-schematic domain-action "<PATH-IN-LIBRARY>" "<ACTION-NAME>" --project=<PROJECT-NAME>
```

```ts
yarn run workspace-schematic domain-action "retrieveVideos" --project=creatr-video --dry-run
yarn run v1.22.0
$ nx workspace-schematic domain-action business/actions retrieveVideos --project=creatr-video --dry-run
$ B:\gitlab\angular-workspace\workspace\node_modules\.bin\tsc -p B:\gitlab\angular-workspace\workspace\tools\tsconfig.generated.json

>  NX  Executing your local schematic: domain-action

CREATE libs/creatr/video/src/lib/business/actions.action.spec.ts (188 bytes)
CREATE libs/creatr/video/src/lib/business/actions.action.ts (1148 bytes)

NOTE: The "dryRun" flag means no changes were made.
Done in 8.67s.
```

## Add a Domain Service to a Domain Library

Use this schematic to create a domain service with business logic layer.

```ts
yarn run workspace-schematic domain-service --name=test --project=state-machine --dry-run
```
