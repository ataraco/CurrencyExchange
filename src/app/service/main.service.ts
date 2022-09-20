import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  url = "http://api.exchangeratesapi.io/v1/latest?access_key=050beeaad0ad5cda72460c6758d5a11e&amp;format=1";
  constructor(private httpClient: HttpClient) { 
    this.getExchangeRates();
  }

  getExchangeRates(){
   return this.httpClient.get<any>(this.url);
  }
}
