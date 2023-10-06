import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs';

import { CountriesServices } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { Gif } from '../../interfaces/country-gifs.interface';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css']
})
export class CountryPageComponent implements OnInit, OnDestroy {

  public initialCountry?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private countriesService: CountriesServices
  ) {}


  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.countriesService.searchCountryByAlphaCode(id))
    )
      .subscribe( ( country ) => {

        if ( !country ) {
          return this.router.navigateByUrl('')
        } else {
          return this.initialCountry = country
        }
    })
  }

  ngOnDestroy(): void {
    this.countriesService.gifList = []
  }

  get gifs(): Gif[] {
    return this.countriesService.gifList;
  }

  goBack():void {
    this.location.back();
  }

}
