import { HttpResponse } from '@angular/common/http';

export function errorResponseToString(
  errorResponse: HttpResponse<any>,
): string {
  return `[${(<any>errorResponse).message}]. ${(<any>errorResponse).error}`;
}
