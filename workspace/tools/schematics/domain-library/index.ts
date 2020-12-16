import { Rule, chain, externalSchematic, schematic } from '@angular-devkit/schematics';

import { DomainLibraryOptions } from './schema';
import { dasherize } from '@angular-devkit/core/src/utils/strings';

export default function (options: DomainLibraryOptions): Rule {
  return chain([
    // yarn run workspace-schematic domain-library --directory=creatr --importPath=@valencia/creatr/video --name=video --dry-run
    externalSchematic('@nrwl/angular', 'lib', {
      // --no-interactive
      directory: options.directory,
      importPath: options.importPath,
      name: options.name,
      simpleModuleName: true,
      style: 'scss',
    }),
    // ng generate @schematics/angular:service --name=video --project=creatr-video --skipTests --no-interactive --dry-run
    // externalSchematic('@schematics/angular', 'service', {
    //   name: options.name,
    //   project: `${options.directory}-${options.name}`,
    //   skipTests: true,
    //   noInteractive: true,
    // }),
    // added [path] to support the [createDefaultPath] in the service template
    schematic('domain-service', {
      name: dasherize(options.name),
      path: `libs/${options.directory}/${options.name}/src/lib`,
      project: `${dasherize(options.directory)}-(${dasherize(options.name)}`,
      flat: true,
      skipTests: true,
    }),
  ]);
}
