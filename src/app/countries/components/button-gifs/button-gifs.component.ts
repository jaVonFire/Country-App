import { Component, Input, OnInit } from '@angular/core';
import { CountriesServices } from '../../services/countries.service';

@Component({
  selector: 'countries-button',
  template: `
  <button *ngIf="condition === false"
  class="btn btn-success mb-4"
  (click)="showGifs()"
  >
    Mostrar Gifs
  </button>
  <button *ngIf="condition === true"
  class="btn btn-danger mb-4"
  (click)="disguiseGifs()"
  >
    Ocultar Gifs
  </button>
`
})

export class ButtonGifComponent implements OnInit {

  constructor( private countriesService: CountriesServices ) {}

  ngOnInit(): void {
    if ( this.countriesService.gifList.length !== 0 ) { this.condition = true }
    else { this.condition = false }
  }

  @Input()
  public countryName: string = ''
  public condition: boolean = false

  showGifs() {
    this.countriesService.gifsSearch(this.countryName);
    this.condition = true;
  }

  disguiseGifs() {
    this.countriesService.gifList.length = 0
    this.condition = false;
  }
}