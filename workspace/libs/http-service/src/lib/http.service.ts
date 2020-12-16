import { Injectable } from '@angular/core';
import { HttpRequestMethod } from './http-request-methods.enum';
import { HttpHeaders, HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HttpRequestOptions } from './http-request-options';
import { Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Use to create [options] for the API request.
   * @param method Use to indicate the HttpRequest verb to target.
   * @param headers Use to provide any [HttpHeaders] with the request.
   * @param url Use to indicate the target URL for the API request.
   * @param body Use to provide a JSON object with the payload for the request.
   * @param withCredentials Use to indicate if request will include credentials (cookies), default value is [true].
   */
  createOptions(method: HttpRequestMethod, headers: HttpHeaders, url: string, body: any, withCredentials: boolean = true): HttpRequestOptions {
    let options: HttpRequestOptions;
    options = new HttpRequestOptions();
    options.requestMethod = method;
    options.headers = headers;
    options.requestUrl = url;
    options.body = body;
    options.withCredentials = withCredentials;
    return options;
  }

  /**
   * Use to create a new [HttpHeaders] object for the HTTP/API request.
   */
  createHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('x-api-key', 'AKIAXQSM343QAEJJVWCJ');
    // x-api-key
    return headers;
  }

  /**
   * Use to execute an HTTP request using the specified options in the [HttpRequestOptions].
   * @param requestOptions
   */
  execute<T>(requestOptions: HttpRequestOptions): Observable<HttpResponse<T>> {
    console.log(`Preparing to perform request to: ${requestOptions.requestUrl}`);
    return this.httpClient.request<T>(requestOptions.requestMethod.toString(), requestOptions.requestUrl, {
      body: requestOptions.body,
      headers: requestOptions.headers,
      reportProgress: requestOptions.reportProgress,
      observe: requestOptions.observe,
      params: requestOptions.params,
      responseType: requestOptions.responseType,
      withCredentials: requestOptions.withCredentials,
    });
  }
}
