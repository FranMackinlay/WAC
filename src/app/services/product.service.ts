import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

export interface Product {
  id: number;
  name: string;
  description: string;
  color: string;
  size: string;
  status: string;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsSrv {

  apiUrl: string = 'http://localhost:5000/api/products';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(`${this.apiUrl}`);
  }

  // Update
  updateProduct(product: Product): Observable<any> {
    let API_URL = `${this.apiUrl}/${product.id}`;
    return this.http.put(API_URL, product, { headers: this.headers }).pipe(
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
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
