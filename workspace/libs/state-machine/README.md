# state-machine

## Create Actions

```ts
yarn run workspace-schematic domain-action "retrieveInitialState" --project=state-machine
yarn run v1.22.0
$ nx workspace-schematic domain-action retrieveInitialState --project=state-machine
$ B:\gitlab\angular-workspace\workspace\node_modules\.bin\tsc -p B:\gitlab\angular-workspace\workspace\tools\tsconfig.generated.json

>  NX  Executing your local schematic: domain-action

CREATE libs/state-machine/src/lib/business/actions/retrieve-initial-state.action.spec.ts (242 bytes)
CREATE libs/state-machine/src/lib/business/actions/retrieve-initial-state.action.ts (1175 bytes)
Done in 9.06s.
```

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test state-machine` to execute the unit tests.
