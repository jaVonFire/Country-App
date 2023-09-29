import { Component } from '@angular/core';

import { CountriesServices } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css']
})
export class ByCapitalPageComponent {

  public countriesCap: Country[] = [];

  constructor( private countriesService: CountriesServices ) {}

  searchByCapital( term: string ): void {
    this.countriesService.searchCapital(term)
      .subscribe( res => {
        this.countriesCap = res
        console.log(res);
      })
  }

}
