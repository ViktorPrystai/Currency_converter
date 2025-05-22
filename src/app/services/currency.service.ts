import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class CurrencyService {
  private apiKey = environment.currencyApiKey;
  private apiUrl = 'https://api.currencyapi.com/v3';

  constructor(private http: HttpClient) {}

  convert(from: string, to: string, amount: number): Observable<any> {
    const url = `${this.apiUrl}/latest?apikey=${this.apiKey}&base_currency=${from}&currencies=${to}`;
    return this.http.get<any>(url).pipe(
      map(data => {
        const rate = data.data[to]?.value || 0;
        return { result: rate * amount };
      })
    );
  }

  getCurrencyList(): Observable<any> {
    const url = `${this.apiUrl}/currencies?apikey=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}





