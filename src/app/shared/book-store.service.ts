import { Injectable } from '@angular/core';
import {Book, Author, Image} from "./book";
import {HttpClient} from "@angular/common/http";
import {Observable,throwError } from "rxjs";
import {catchError, retry} from 'rxjs/operators';

@Injectable()
export class BookStoreService {

private api = 'https://bookstore21.s1810456013.student.kwmhgb.at/api';

constructor(private http: HttpClient) { }

getAll(): Observable<Array<Book>> {
  return this.http.get<Array<Book>>(`${this.api}/books`)
  .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

getSingle(isbn: string): Observable<Book> {
    return this.http
      .get<Book>(`${this.api}/book/${isbn}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

create(book: Book): Observable<any> {
  return this.http.post(`${this.api}/book`, book)
  .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

update(book: Book): Observable<any> {
  return this.http.put(`${this.api}/book/${book.isbn}`, book)
  .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

remove(isbn: string): Observable<any> {
  return this.http.delete(`${this.api}/book/${isbn}`)
  .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllSearch(searchTerm:string): Observable<Array<Book>>{
    return this.http
      .get<Array<Book>>(`${this.api}/books/search/${searchTerm}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  } 

private errorHandler(error: Error | any){
  return throwError(error);
  }

//*optional
check(isbn: string): Observable<Boolean> {
  return this.http.get<Boolean>(`${this.api}/books/checkisbn/${isbn}`)
  .pipe(retry(3))
  .pipe(catchError(this.errorHandler));
}


}
