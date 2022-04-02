import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionSnapshots,
  doc,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class MatchdayService {
  constructor(private firestore: Firestore) {}

  getMatchdays() {
    let data: any = collection(this.firestore, 'matchdays');
    let items = collectionSnapshots(data);

    return items;
  }

  createMatchday(item: any) {
    let data: any = collection(this.firestore, 'matchdays');
    console.log(item);
    let result = item;

    result.goals = result.goals
      .filter((goalItem: any) => {
        return parseInt(goalItem.goals) > 0;
      })
      .map((goalItem: any) => {
        return {
          player: goalItem.player,
          goals: parseInt(goalItem.goals),
        };
      });
    result.assists = result.assists
      .filter((assistItem: any) => {
        return parseInt(assistItem.assists) > 0;
      })
      .map((assistItem: any) => {
        return {
          player: assistItem.player,
          assists: parseInt(assistItem.assists),
        };
      });
    console.log(result);

    return addDoc(data, result);
  }

  editMatchday(matchday: any) {
    let db: any = collection(this.firestore, 'matchdays');
    const { id, ...data } = matchday;
    return setDoc(doc(this.firestore, 'matchdays', id), data, { merge: true });
  }
}
