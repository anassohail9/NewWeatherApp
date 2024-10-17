import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from './services/weather.service';
import { LocationData } from './models/location.model';
import { WeatherData } from './models/weather.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private weatherService: WeatherService, private router: Router) {}

  locationData?: LocationData;
  weatherData?: WeatherData;
  isSettingsVisible: boolean = false;

  ngOnInit(): void {
    // Any initialization if needed
  }

  onCitySearch(cityName: string): void {
    console.log('City Search:', cityName);
    this.getLocationID(cityName);
  }
  
  settingsVisibility(settings: string): void {
    console.log('City Search:', settings);
    if(settings === "true") {
      console.log("$$$$$$$$$$$$$$$$$$$");
      this.isSettingsVisible = true;
    } else {
      this.isSettingsVisible = false;
    }
  }

  private getLocationID(cityName: string): void {
    this.weatherService.getLocationData(cityName).subscribe({
      next: (response) => {
        this.locationData = response;
        const locationId = this.locationData[0].Key; // Extract location ID
        console.log('Location ID:', locationId);
        
        this.getWeatherData(locationId); // Fetch weather data after getting location ID
      },
      error: (err) => {
        console.error('Error fetching location data', err);
      }
    });
  }

  private getWeatherData(locationId: string): void {
    this.weatherService.getWeatherData(locationId).subscribe({
      next: (response) => {
        this.weatherData = response;
        console.log('Weather Data:', this.weatherData[0].Temperature.Metric.Value);
      },
      error: (err) => {
        console.error('Error fetching weather data', err);
      }
    });
  }

  openSettingsPage() {
    this.isSettingsVisible = true;
    this.router.navigate(['/settings']);  // Navigate to the settings page
  }
  closeSettingsPage() {
    this.isSettingsVisible = false;
  }
}
