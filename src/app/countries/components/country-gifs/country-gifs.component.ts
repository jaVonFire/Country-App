import { Component, Input } from '@angular/core';

import { Gif } from '../../interfaces/country-gifs.interface';

@Component({
  selector: 'countries-gifs',
  templateUrl: './country-gifs.component.html',
  styleUrls: ['./country-gifs.component.css']
})
export class CountryGifsComponent {

  @Input()
  public gifs: Gif[] = [];

}
