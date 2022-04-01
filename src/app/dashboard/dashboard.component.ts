import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { WeatherService } from '../services/weather.service';

interface Item {
  name: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  items: Item[] = [];
  cards = [
    { title: 'Equipo de la jornada', cols: 2, rows: 1 },
    { title: 'Máximo goleador', cols: 1, rows: 1 },
    { title: 'Lista de jornadas', cols: 1, rows: 2 },
    { title: 'El Tiempo', cols: 1, rows: 1 },
  ];

  weekend: any = [];

  constructor(
    private playerService: PlayerService,
    private weatherService: WeatherService
  ) {}

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
