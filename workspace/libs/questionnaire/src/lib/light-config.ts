import { IStateMachineConfig, MachineAction, State } from '@valencia/state-machine';

export class lightConfig<T> implements IStateMachineConfig<T> {
  actions: MachineAction[] = [];
  context: T;
  id: string;
  initialState: State<any>;
  name: string;
  states: State<any>[];
}
