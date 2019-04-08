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
                'http://localhost:8081/getAllColumns'
            )
            .pipe(
                map(response => response),
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                })
            );
    }

    submitColumns(columns) {
        return this.http
            .post(
                'http://localhost:8081/submitColumns',
                columns
            )
            .pipe(
                map(response => response),
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                })
            );
    }


    readFile1(event: any) {
        let fileList: FileList = event.target.files;
        debugger;
        let file: File = fileList[0];
        let formData: FormData = new FormData();
        formData.append('file', file);
        return this.http
            .post(
                'http://localhost:8081/readFile', formData
            )
            .pipe(
                map(response => response),
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                })
            );
    }


    readFile2(event: any) {
        let fileList: FileList = event.target.files;

        let file: File = fileList[0];
        let formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.http
            .post(
                'http://localhost:8081/readFile2', formData
            )
            .pipe(
                map(response => response),
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                })
            );
    }
}
