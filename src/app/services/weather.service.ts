import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  private DAYS_OF_WEEK = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  dayOfWeek(day: number) {
    return this.DAYS_OF_WEEK[day];
  }

  getForecast() {
    const { weather_url, latitude, longitude, open_weather_key } = environment;
    const url = `${weather_url}/onecall?lat=${latitude}&lon=${longitude}&appid=${open_weather_key}&lang=es&units=metric`;

    return this.http.get(url);
  }
}
