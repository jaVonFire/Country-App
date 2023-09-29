import { Component } from '@angular/core';

import { Country } from '../../interfaces/country';
import { CountriesServices } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent {

  public countriesReg: Country[] = [];

  constructor( private countriesService: CountriesServices ) {}

  searchByRegion( term: string ): void {
    this.countriesService.searchRegion(term)
      .subscribe( res => {
        this.countriesReg = res
        console.log(res);
      })
  }

}
