import { Component, OnInit } from '@angular/core';

import { CountriesServices } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent implements OnInit {

  public countriesCountry: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = ''

  constructor( private countriesService: CountriesServices ) {}

  ngOnInit(): void {
    this.countriesCountry = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
  }

  searchByCountry( term: string ): void {
    this.isLoading = true;
    this.countriesService.searchCountry(term)
      .subscribe( res => {
        this.isLoading = false;
        this.countriesCountry = res
      })
  }

}
