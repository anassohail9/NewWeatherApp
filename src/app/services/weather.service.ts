import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { LocationData } from '../models/location.model';
import { WeatherData } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }
  public onSearch$: BehaviorSubject<string> = new BehaviorSubject<string>("");

  getLocationData(cityName: string): Observable<LocationData> {
    return this.http.get<LocationData>('http://dataservice.accuweather.com/locations/v1/cities/search', {
      headers: new HttpHeaders()
        .set('Host', 'dataservice.accuweather.com'),
      params: new HttpParams()
        .set('apikey', 'your_accu_weather_secret_key')
        .set('q', cityName)
    })
  }

  getWeatherData(locationId: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(`http://dataservice.accuweather.com/currentconditions/v1/${locationId}`, {
      headers: new HttpHeaders()
        .set('Host', 'dataservice.accuweather.com'),
      params: new HttpParams()
        .set('apikey', 'your_accu_weather_secret_key')
    })
  }

  sendEvent(data: any) {
    this.onSearch$.next(data);
  }

  getEvent() {
    return this.onSearch$.asObservable();
  }
}