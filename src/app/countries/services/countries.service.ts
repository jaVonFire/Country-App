import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, catchError, delay, tap, map, of } from 'rxjs'

import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';
import { Gif, SearchResponse } from '../interfaces/country-gifs.interface';

@Injectable({providedIn: 'root'})

export class CountriesServices {

  private apiCountriesUrl: string = 'https://restcountries.com/v3.1'
  private apiGifsCountriesUrl: string = 'yIEopdsqujVxi3ek3YDEs7gnMCP98LHh'
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'
  public gifList: Gif[] = [];

  public cacheStore: CacheStore = {
    byCapital:   { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion:    { region: '', countries: [] },
  }

  constructor(private http: HttpClient) { this.loadFromLocalStorage() }

  private saveToLocalStorage() {
    localStorage.setItem( 'cacheStore', JSON.stringify( this.cacheStore ));
  }

  private loadFromLocalStorage() {
    if ( !localStorage.getItem('cacheStore') ) {return}
    this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')! )
  }

  private getCountriesReq( url: string ): Observable<Country[]> {
    return this.http.get<Country[]>( url )
      .pipe(
        catchError( () => of([])),
        delay( 1000 )
      )
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | null> {
    const url = `${ this.apiCountriesUrl }/alpha/${code}`
    return this.http.get<Country[]>( url )
      .pipe(
        map( res => res.length > 0 ? res[0]: null ),
        catchError( () => of(null) )
      )
  }

  searchCapital( term: string ): Observable<Country[]> {
    const url = `${ this.apiCountriesUrl }/capital/${term}`
    return this.getCountriesReq(url)
      .pipe(
        tap( ( res ) => this.cacheStore.byCapital = { term, countries: res } ),
        tap( () => this.saveToLocalStorage() )
      )
  }

  searchCountry( term: string ): Observable<Country[]> {
    const url = `${ this.apiCountriesUrl }/name/${term}`
    return this.getCountriesReq(url)
      .pipe(
        tap( ( res ) => this.cacheStore.byCountries = { term, countries: res } ),
        tap( () => this.saveToLocalStorage() )
      )
  }

  searchRegion( region: Region ): Observable<Country[]> {
    const url = `${ this.apiCountriesUrl }/region/${region}`
    return this.getCountriesReq(url)
      .pipe(
        tap( ( res ) => this.cacheStore.byRegion = { region, countries: res } ),
        tap( () => this.saveToLocalStorage() )
      )
  }

  gifsSearch( country: string ): void {

    const params = new HttpParams()
      .set('api_key', this.apiGifsCountriesUrl )
      .set('limit', '12' )
      .set('q', country )

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params }).subscribe( res =>{
      this.gifList = res.data;
    })
  }

}