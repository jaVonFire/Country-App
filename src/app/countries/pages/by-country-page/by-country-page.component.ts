import { Component } from '@angular/core';

import { Country } from '../../interfaces/country';
import { CountriesServices } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent {

  public countriesCountry: Country[] = [];

  constructor( private countriesService: CountriesServices ) {}

  searchByCountry( term: string ): void {
    this.countriesService.searchCountry(term)
      .subscribe( res => {
        this.countriesCountry = res
        console.log(res);
      })
  }

}
