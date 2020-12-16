export function generateApiUrl(apiUrl: string, endpoint: string, returnUrl?: string, additionalQueryStringParams?: {}): string {
  returnUrl = encodeURIComponent(
    returnUrl == null
      ? window.location.origin // <-- must be origin not href
      : returnUrl
  );

  let url = `${apiUrl}${endpoint}${returnUrl ? `?returnUrl=${returnUrl}` : ''}`;

  if (additionalQueryStringParams) {
    url = `${url}&${Object.keys(additionalQueryStringParams)
      .map(key => `${key}=${additionalQueryStringParams[key]}`)
      .join('&')}`;
  }

  return url;
}
