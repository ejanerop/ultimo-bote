import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionSnapshots,
  deleteDoc,
  doc,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatchdayService {
  constructor(private firestore: Firestore) {}

  getMatchdays() {
    let data: any = collection(this.firestore, 'matchdays');

    return collectionSnapshots(data).pipe(
      map((items: any) => {
        return items.map((item: any) => {
          return {
            id: item.id,
            dateTime: new Date(item.data().date.seconds * 1000),
            ...item.data(),
          };
        });
      })
    );
  }

  createMatchday(item: any) {
    let data: any = collection(this.firestore, 'matchdays');
    console.log(item);
    let { id, ...result } = item;

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
    const { id, ...data } = matchday;
    data.goals = data.goals
      .filter((goalItem: any) => {
        return parseInt(goalItem.goals) > 0;
      })
      .map((goalItem: any) => {
        return {
          player: goalItem.player,
          goals: parseInt(goalItem.goals),
        };
      });
    data.assists = data.assists
      .filter((assistItem: any) => {
        return parseInt(assistItem.assists) > 0;
      })
      .map((assistItem: any) => {
        return {
          player: assistItem.player,
          assists: parseInt(assistItem.assists),
        };
      });
    return setDoc(doc(this.firestore, 'matchdays', id), data, { merge: true });
  }

  removeMatchday(matchday: any) {
    return deleteDoc(doc(this.firestore, 'matchdays', matchday.id));
  }
}
