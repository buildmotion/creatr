import { Guid } from 'guid-typescript';
import { IStateMachineConfig } from './i-state-machine.config';
import { MachineAction } from './machine-action';
import { State } from './state';

export class MachineContext<T> implements IStateMachineConfig<T> {
  actions: MachineAction[] = [];
  context: T;
  id: string;
  initialState: string;
  name: string;
  states: Array<State<any>> = [];

  /**
   * Use to define a context for the State Machine.
   */
  constructor(name: string) {
    // if (name === undefined || name === null) {
    //   throw new Error('A machine context requires a valid name.');
    // }
    this.name = name;
    this.id = Guid.create().toString();
  }
}
