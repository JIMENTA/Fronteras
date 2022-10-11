import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pais, PaisSmall } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  private _baseUrl: string = 'https://restcountries.com/v3.1';
  private _regiones : string[] = ['Africa','Americas', 'Asia','Europa','Oceania'];

  get regiones() : string[]{
    return [...this._regiones]
  }

  constructor( private http : HttpClient) { }

  getCountriesByRegion(region:string): Observable<PaisSmall[]>{
    const url: string= `${this._baseUrl}/region/${region}`
    return this.http.get<PaisSmall[]>(url)
  }

  getCountrieByCode( code : string):Observable<Pais[] | null>{
    if (!code){return of(null)}

    const url = `${this._baseUrl}/alpha/${code}`
    return this.http.get<Pais[]>(url)

  }
}
