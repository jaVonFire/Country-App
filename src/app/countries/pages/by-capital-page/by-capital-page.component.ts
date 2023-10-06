import { Component, OnInit } from '@angular/core';

import { CountriesServices } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css']
})
export class ByCapitalPageComponent implements OnInit {

  public countriesCap: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = ''

  constructor( private countriesService: CountriesServices ) {}

  ngOnInit(): void {
    this.countriesCap = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  searchByCapital( term: string ): void {
    this.isLoading = true;
    this.countriesService.searchCapital(term)
      .subscribe( res => {
        this.countriesCap = res
        this.isLoading = false;
      })
  }

}
