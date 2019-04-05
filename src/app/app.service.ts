import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable()
export class AppService {
    constructor(private http: HttpClient) { }

    getJson() {
        return this.http
            .get(
                'https://jsonplaceholder.typicode.com/comments',
                // this.jwt()
            )
            .pipe(
                map(response => response),
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                })
            );
    }

    // private jwt() {
    //     const headers = new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         Authorization: environment.TempAuthorizationJwtToken
    //     });
    //     return { headers: headers };
    // }
}
