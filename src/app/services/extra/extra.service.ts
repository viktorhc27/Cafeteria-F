import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExtraService {
  base: string = "http://localhost:3000/"
  controller: string = 'extras/';


  constructor(private http: HttpClient) { }

  list(): Observable<any> {
    return this.http.get(this.base + this.controller + "/index")
  }
}

