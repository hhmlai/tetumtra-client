import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, finalize } from 'rxjs/operators';
import Tokenizer from 'sentence-tokenizer'
var tokenizer = new Tokenizer();

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

  TranslateStart(pair, text): Observable<any> {
    if (text.length > 0)
      this.active = true
      return this.http
        .post(this.base_path, JSON.stringify({ 'model': 'sp_int16_en', 'pair': pair, 'client': '', 'text': text }), this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError),
          finalize(()=> this.active = false)
        )
  }

  selectText(id) {
    const input = document.getElementById(id).getElementsByTagName('textarea')[0];
    input.focus();
    input.select();
  }  

  translate(pair, state) {
    if (state.value.length > 0) {
      var batch = []
      state.value.split(/\r?\n/).forEach(s1 => {
        tokenizer.setEntry(s1)
        tokenizer.getSentences().forEach(s2 => {
          batch.push(s2)
        })
        batch.push('\n')
      })
      var trans = new Array(batch.length).fill('translating...\n')
      batch.forEach((s, i) => {
        console.log(s)
        if (s.length > 1) {
          this.TranslateStart(pair, s).subscribe(res => {
            trans[i] = res.translation + ' '
            state.translation = trans.join('')
          });
        } else {
          trans[i] = s
          state.translation = trans.join('')
        }
      })
    }
  }
}
