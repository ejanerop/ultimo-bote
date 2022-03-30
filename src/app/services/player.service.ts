import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Item {
  name: string;
  nick: string;
  profile_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private firestore: Firestore) {}

  getPlayers() {
    let data: any = collection(this.firestore, 'players');
    let items = collectionData(data);
    console.log(items);
    return items as Observable<Item[]>;
  }
}
