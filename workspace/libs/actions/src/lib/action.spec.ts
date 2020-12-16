import { Action } from './action';
import { ActionResult } from './action-result';

class MyAction extends Action {
  performAction() {}
  preValidateAction() {}
  validateActionResult(): ActionResult {
    return this.actionResult;
  }
}

let testAction: MyAction;
describe('Action', () => {
  beforeEach(() => {
    testAction = new MyAction();
  });

  it('should create an instance', () => {
    expect(testAction).toBeTruthy();
  });

  it('should call preValidateAction when executed', () => {
    const spy = jest.spyOn(MyAction.prototype, 'preValidateAction');
    testAction.execute();
    expect(testAction.preValidateAction).toBeCalled();
  });

  it('should call performAction when executed', () => {
    const spy = jest.spyOn(MyAction.prototype, 'performAction');
    testAction.execute();
    expect(testAction.performAction).toBeCalled();
  });

  it('should call validateActionResult when executed', () => {
    const spy = jest.spyOn(MyAction.prototype, 'validateActionResult');
    testAction.execute();
    expect(testAction.validateActionResult).toBeCalled();
  });

  it('should return default action result', () => {
    testAction.execute();
    expect(testAction.actionResult).toEqual(ActionResult.Unknown);
  });
});
