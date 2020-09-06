import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'any'
})
export class TetumtraService {
  base_path: string = "https://server-dot-tetumtra.appspot.com/trans/";

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  active = false

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  Translate(pair, text): Observable<any> {
    this.active = true
    return this.http
      .post(this.base_path, JSON.stringify({ 'model': 'sp_int16_en', 'pair': pair, 'client': '', 'text': text }), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError),
        finalize(()=> this.active = false)
      )
  }
}
