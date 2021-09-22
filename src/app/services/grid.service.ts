import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  private readonly baseUrl: string = "/api/grid";

  constructor(private http: HttpClient) { }

  getGrids(): Observable<string[][]> {
    const url = `${this.baseUrl}`

    return this.http.get<string[][]>(url);
  }
}
