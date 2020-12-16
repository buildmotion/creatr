import { IStateMachineConfig, MachineAction, State } from '@valencia/state-machine';

import { Guid } from 'guid-typescript';

export const qConfig: IStateMachineConfig<string> = {
  actions: [],
  context: 'abc-123',
  id: Guid.create().toString(),
  initialState: 'start',
  name: 'abc-123',
  states: [
    {
      context: 'email-address',
      entry: [],
      events: [
        {
          name: 'next',
          target: 'password',
        },
      ],
      exit: [],
      id: Guid.create().toString(),
      name: 'start',
      transitions: [],
    },
    {
      context: 'password',
      entry: [],
      events: [
        {
          name: 'previous',
          target: 'email-address',
        },
        {
          name: 'next',
          target: 'verify-account',
        },
      ],
      exit: [],
      id: Guid.create().toString(),
      name: 'password',
      transitions: [],
    },
    {
      context: 'verify-account',
      entry: [],
      events: [
        {
          name: 'previous',
          target: 'password',
        },
        {
          name: 'next',
          target: 'contact-info',
        },
      ],
      exit: [],
      id: Guid.create().toString(),
      name: 'verify-account',
      transitions: [],
    },
    {
      context: 'contact-info',
      entry: [],
      events: [
        {
          name: 'next',
          target: 'company-info',
        },
      ],
      exit: [],
      id: Guid.create().toString(),
      name: 'contact-info',
      transitions: [],
    },
    {
      context: 'company-info',
      entry: [],
      events: [
        {
          name: 'previous',
          target: 'contact-info',
        },
      ],
      exit: [],
      id: Guid.create().toString(),
      name: 'contact-info',
      transitions: [],
      //stateType: StateType.Finale;
    },
  ],
};
