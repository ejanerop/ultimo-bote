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
  profile_url: string;
}

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit {
  items: Item[] = [];
  profileUrl: Promise<string | null>;

  constructor(
    firestore: Firestore,
    private playerService: PlayerService,
    private storage: Storage
  ) {
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
        this.items = items;
        console.log(this.items);
      });

    const reference = ref(storage, 'eric (2).jpg');
    this.profileUrl = getDownloadURL(reference);
  }

  ngOnInit(): void {}
}
