import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  constructor (private weatherService: WeatherService) {}
  @Output() citySearch = new EventEmitter<string>();
  cityName: string = '';

  ngOnInit() {
    this.cityName = 'Aligarh';
    this.onInputSubmit();
  };
  onInputSubmit(): void {
    if (this.cityName.trim()) {
      this.weatherService.sendEvent(this.cityName);
      //this.citySearch.emit(this.cityName);
    }
    this.cityName = '';
  }
}
