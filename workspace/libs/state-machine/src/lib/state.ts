import { Guid } from 'guid-typescript';
import { MachineAction } from './machine-action';
import { MachineEvent } from './machine-event';
import { Transition } from './transition';

export class State<T> {
  context: T;
  entry: Array<MachineAction> = [];
  events: MachineEvent[] = [];
  exit: Array<MachineAction> = [];
  id: string;
  name: string;
  transitions: Transition[] = [];

  constructor(name: string) {
    this.name = name;
    this.id = Guid.create().toString();
  }
}
