import {Injectable} from '@angular/core';
import {Log} from '../models/log';
import {BehaviorSubject, Observable} from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
// Log service uses firebase to perform basic operations
export class LogService {
  logDocument: AngularFirestoreDocument<Log>;
  logCollection: AngularFirestoreCollection<Log>;
  log: Observable<any>;
  logsObservable: Observable<Log[]>;

  private behaviourSubject = new BehaviorSubject<Log>({id: null, text: null, date: null});
  selectedLog = this.behaviourSubject.asObservable();

  private behaviourSubjectState = new BehaviorSubject<boolean>(true);
  selectedLogState = this.behaviourSubjectState.asObservable();

  constructor(private angularFireStore: AngularFirestore) {
    this.logCollection = angularFireStore.collection('devlogs', ref => ref.orderBy('date', 'asc'));
  }

  // Show Existing Logs
  getLogs(): Observable<Log[]> {
    this.logsObservable = this.logCollection.snapshotChanges().pipe(
      map(changes => changes.map(
        action => {
          const data = action.payload.doc.data() as Log;
          data.id = action.payload.doc.id;
          return data;
        })));
    return this.logsObservable;
  }

  setFormLog(log: Log) {
    this.behaviourSubject.next(log);
  }

  // Add New
  addLogs(log: Log) {
    this.logCollection.add(log).then(function (event) {
      console.log('Added Log to the collection', event.id);
    });
  }

  // Update Log
  updateLog(log: Log) {
    this.logDocument = this.angularFireStore.doc<Log>(`devlogs/${log.id}`);
    this.logDocument.update(log).then(function () {
      console.log('Updated Log Item');
    });
  }

  // Delete Log
  deleteLog(log: Log) {
    this.logDocument = this.angularFireStore.doc<Log>(`devlogs/${log.id}`);
    this.logDocument.delete().then(function () {
      console.log('Deleted Log Item');
    });
  }
}
