import { HttpClientModule } from '@angular/common/http';
import { LoggingService } from '@valencia/logging';
import { MachineContext } from './machine-context';
import { State } from './state';
import { StateService } from './state.service';
import { TestBed } from '@angular/core/testing';

let context: any;
describe('StateService with Light Machine', () => {
  beforeAll(() => {
    context = new MachineContext('Light');
    const state = new State('green');
    context.states.push(state);
    context.initialState = state;
  });

  afterAll(() => {
    console.log(JSON.stringify(context));
  });

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        {
          provide: LoggingService,
          useClass: LoggingService,
        },
      ],
    })
  );

  it('should not create machine with [invalid] machine state name', () => {
    const context = new MachineContext(undefined);
    const service: StateService = TestBed.inject(StateService);
    expect(service).toBeTruthy();

    service.create(context);

    expect(service.context.name).toBe(undefined);
  });

  it('should create machine with [valid] initial state', () => {
    const service: StateService = TestBed.inject(StateService);

    service.create(context);

    expect(service).toBeTruthy();
    expect(service.context).not.toBe(null);
    expect(service.context.initialState).not.toBeNull();
  });

  it('should create machine with name', () => {
    const service: StateService = TestBed.inject(StateService);
    expect(service).toBeTruthy();

    service.create(context);

    expect(service.context).not.toBe(null);
    expect(service.context.name).not.toBeUndefined();
  });

  it('should create machine with valid id', () => {
    const service: StateService = TestBed.inject(StateService);
    expect(service).toBeTruthy();

    service.create(context);

    expect(service.context).not.toBe(null);
    expect(service.context.id).not.toBeUndefined();
  });

  it('should create machine with valid id', () => {
    const service: StateService = TestBed.inject(StateService);
    expect(service).toBeTruthy();

    service.create(context);

    expect(service.context).not.toBe(null);
    expect(service.context.id).not.toBeUndefined();
  });

  it('should add new state to context', () => {
    const service: StateService = TestBed.inject(StateService);
    expect(service).toBeTruthy();

    service.create(context);
    const yellowState = new State('yellow');
    service.addState(yellowState);

    expect(service.context).not.toBe(null);
    expect(service.context.id).not.toBeUndefined();
  });
});
