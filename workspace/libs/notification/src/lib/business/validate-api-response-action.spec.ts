import { ApiMessage, ApiMessageType, ApiResponse } from '@valencia/common';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { LoggingService, MockLoggingService } from '@valencia/logging';

import { ActionResult } from '@valencia/actions';
import { ServiceContext } from '@valencia/rules-engine';
import { TestBed } from '@angular/core/testing';
import { ValidateApiResponseAction } from './validate-api-response-action';

describe('ValidateFormMessageAction', () => {
  it('should create an instance', () => {
    expect(new ValidateApiResponseAction(null)).toBeTruthy();
  });

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LoggingService,
          useClass: MockLoggingService,
        },
        HttpClient,
        HttpHandler,
      ],
    })
  );

  it('should contain a valid response', () => {
    const logger: LoggingService = TestBed.get(LoggingService);
    const apiResponse = new ApiResponse();

    const action = new ValidateApiResponseAction(apiResponse);
    action.serviceContext = new ServiceContext();
    action.actionName = 'ValidateApiResponseAction';
    action.loggingService = logger;
    action.execute();

    expect(action.response).not.toBeNull();
  });

  it('should contain a valid input for ApiResponse item', () => {
    const logger: LoggingService = TestBed.get(LoggingService);
    const apiResponse = new ApiResponse();
    apiResponse.message = 'A test message.';
    apiResponse.messages.push(new ApiMessage('TEST_CODE', ApiMessageType.Error));

    const action = new ValidateApiResponseAction(apiResponse);
    action.serviceContext = new ServiceContext();
    action.actionName = 'ValidateApiResponseAction';
    action.loggingService = logger;
    action.execute();

    expect(action.response).not.toBeNull();
    expect(action.actionResult).toEqual(ActionResult.Success);
  });

  it('should contain a valid message collection/array', () => {
    const logger: LoggingService = TestBed.get(LoggingService);
    const apiResponse = new ApiResponse();
    apiResponse.message = 'A test message.';
    apiResponse.messages.push(new ApiMessage('TEST_CODE1', ApiMessageType.Error));
    apiResponse.messages.push(new ApiMessage('TEST_CODE2', ApiMessageType.Error));

    const action = new ValidateApiResponseAction(apiResponse);
    action.serviceContext = new ServiceContext();
    action.actionName = 'ValidateApiResponseAction';
    action.loggingService = logger;
    action.execute();

    expect(action.response).not.toBeNull();
    expect(action.actionResult).toEqual(ActionResult.Success);
  });

  it('should return rule violation for null input', () => {
    const logger: LoggingService = TestBed.get(LoggingService);

    const action = new ValidateApiResponseAction(null);
    action.serviceContext = new ServiceContext();
    action.actionName = 'ValidateApiResponseAction';
    action.loggingService = logger;
    action.execute();

    expect(action.response).not.toBeNull();
    expect(
      action.serviceContext.Messages.find((m) => {
        return m.Name === 'ApiResponseIsValid';
      })
    ).not.toBeUndefined();
    expect(action.actionResult).toEqual(ActionResult.Fail);
    expect(action.serviceContext.Messages.length).toEqual(1);
  });

  it('should return rule violation for null/undefined error messages', () => {
    const logger: LoggingService = TestBed.get(LoggingService);
    const apiResponse = new ApiResponse();
    apiResponse.message = 'A test message.';
    apiResponse.messages = null;

    const action = new ValidateApiResponseAction(apiResponse);
    action.serviceContext = new ServiceContext();
    action.actionName = 'ValidateApiResponseAction';
    action.loggingService = logger;
    action.execute();

    expect(action.response).not.toBeNull();
    expect(
      action.serviceContext.Messages.find((m) => {
        return m.Name === 'ApiMessagesNotNullUndefined';
      })
    ).not.toBeUndefined();
    expect(action.actionResult).toEqual(ActionResult.Fail);
    expect(action.serviceContext.Messages.length).toEqual(1);
  });

  it('should return rule violation for invalid length of message collection', () => {
    const logger: LoggingService = TestBed.get(LoggingService);
    const apiResponse = new ApiResponse();
    apiResponse.message = 'A test message.';
    apiResponse.messages = [];

    const action = new ValidateApiResponseAction(apiResponse);
    action.serviceContext = new ServiceContext();
    action.actionName = 'ValidateApiResponseAction';
    action.loggingService = logger;
    action.execute();

    expect(action.response).not.toBeNull();
    expect(
      action.serviceContext.Messages.find((m) => {
        return m.Name === 'MessagesLengthMin';
      })
    ).not.toBeUndefined();
    expect(action.actionResult).toEqual(ActionResult.Fail);
    expect(action.serviceContext.Messages.length).toEqual(1);
  });

  it('should return rule violation for invalid error message code', () => {
    const logger: LoggingService = TestBed.get(LoggingService);
    const apiResponse = new ApiResponse();
    apiResponse.message = 'A test message.';

    apiResponse.messages.push(new ApiMessage('TEST_CODE1', ApiMessageType.Error));
    apiResponse.messages.push(new ApiMessage('', ApiMessageType.Error)); //INVALID
    apiResponse.messages.push(new ApiMessage('', ApiMessageType.Error)); //INVALID
    apiResponse.messages.push(new ApiMessage('', ApiMessageType.Error)); //INVALID

    const action = new ValidateApiResponseAction(apiResponse);
    action.serviceContext = new ServiceContext();
    action.actionName = 'ValidateApiResponseAction';
    action.loggingService = logger;
    action.execute();

    expect(action.response).not.toBeNull();
    expect(
      action.serviceContext.Messages.find((m) => {
        return m.Name === 'MessageErrorCodeIsValid';
      })
    ).not.toBeUndefined();
    expect(action.actionResult).toEqual(ActionResult.Fail);
    expect(action.serviceContext.Messages.length).toEqual(3);
  });
});
