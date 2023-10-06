import { Component, OnInit } from '@angular/core';


import { Country } from '../../interfaces/country.interface';
import { CountriesServices } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent implements OnInit {

  public countriesReg: Country[] = [];
  public isLoading: boolean = false;
  public regions: Region[] = ['Africa','Americas','Asia','Europe','Oceania'];
  public selectedRegion?: Region;

  constructor( private countriesService: CountriesServices ) {}

  ngOnInit(): void {
    this.countriesReg = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion( region: Region ): void {
    this.selectedRegion = region
    this.isLoading = true;
    this.countriesService.searchRegion(region)
      .subscribe( res => {
        this.isLoading = false;
        this.countriesReg = res
      })
  }

}
