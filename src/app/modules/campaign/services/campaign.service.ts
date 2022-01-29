import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Campaign } from 'src/app/core/interfaces/campaign.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  httpOptions: any;
  headers: Headers = new Headers();
  constructor(public http: HttpClient) { }

  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<any>(`${environment.API_URL}/campaigns`)
      .pipe(
        catchError((e: any) => {
          return throwError(e);
        })
      );
  }


  getCampaign(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${environment.API_URL}/campaigns/${id}`).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }

  createCampaign(params: {}): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/campaigns`, params)
      .pipe(
        catchError((e: any) => {
          return throwError(e);
        })
      );
  }

  updateCampaign(id: string, params: {}): Observable<any> {
    return this.http.put<any>(`${environment.API_URL}/campaigns/${id}`, params)
      .pipe(
        catchError((e: any) => {
          return throwError(e);
        })
      );
  }

  deleteCampaign(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.API_URL}/campaigns/${id}`).pipe(
      catchError((e: any) => {
        return throwError(e);
      })
    );
  }

}
