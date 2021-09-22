import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private readonly baseUrl: string = "/api/word";

  constructor(private http: HttpClient) { }

  getWords(): Observable<string[]> {
    const url = `${this.baseUrl}`

    return this.http.get<string[]>(url);
  }
}
