import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { map, Observable } from 'rxjs';
import { PlayerService } from 'src/app/services/player.service';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';

interface Item {
  id: string;
  name: string;
  nick: string;
  profile_url: any;
}

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit {
  items: Item[] = [];

  constructor(private playerService: PlayerService, private storage: Storage) {
    this.playerService
      .getPlayers()
      .pipe(
        map((items: any) => {
          return items.map((item: any) => {
            return { id: item.id, ...item.data() };
          });
        })
      )
      .subscribe((items: any) => {
        this.items = items.map((item: any) => {
          let reference: any;
          if (!item.profile_url) {
            reference = ref(storage, 'default-player.svg');
          } else {
            reference = ref(storage, item.profile_url);
          }
          item.profile_url = getDownloadURL(reference);
          return item;
        });
        console.log(this.items);
      });
  }

  ngOnInit(): void {}
}
