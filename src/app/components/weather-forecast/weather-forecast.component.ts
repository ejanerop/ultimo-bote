import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
})
export class WeatherForecastComponent implements OnInit {
  weekend: any = [];

  constructor(public weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getForecast().subscribe((data: any) => {
      let { daily } = data;
      let weekend = daily
        .map((item: any) => {
          item.date = new Date(item.dt * 1000);
          item.dayOfWeek = item.date.getDay();
          return item;
        })
        .filter((item: any) => {
          return item.dayOfWeek === 6 || item.dayOfWeek === 0;
        });
      this.weekend = weekend;
      console.log(weekend);
    });
  }

  dayOfWeek(day: number) {
    return this.weatherService.dayOfWeek(day);
  }
}
