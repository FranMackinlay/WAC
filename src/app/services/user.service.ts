import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Product } from '../interfaces/product.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersSrv {

  apiUrl: string = 'https://wac-heroku.herokuapp.com/api/users';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getUser(_id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${_id}`);
  }

  signIn(user: User): Observable<any> {
    let API_URL = `${this.apiUrl}/signin`;
    return this.http.post(API_URL, user, { headers: this.headers }).pipe(
      catchError(this.error)
    )
  }

  // Update
  updateUser(user: User): Observable<any> {
    let API_URL = `${this.apiUrl}/${user._id}`;
    return this.http.put(API_URL, user, { headers: this.headers }).pipe(
      catchError(this.error)
    )
  }

  // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    if (error.status === 401) alert('Incorrect username or password')
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
