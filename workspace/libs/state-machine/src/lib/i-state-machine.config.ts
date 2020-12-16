import { MachineAction } from './machine-action';
import { State } from './state';

export interface IStateMachineConfig<T> {
  actions: MachineAction[];
  context: T;
  id: string;
  initialState: string;
  name: string;
  states: State<any>[];
}
