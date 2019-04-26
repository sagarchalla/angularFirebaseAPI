import {Injectable} from '@angular/core';
import {Log} from '../models/log';
import {BehaviorSubject} from 'rxjs';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  logs: Log[];
  private behaviourSubject = new BehaviorSubject<Log>({id: null, text: null, date: null});
  selectedLog = this.behaviourSubject.asObservable();

  private behaviourSubjectState = new BehaviorSubject<boolean>(true);
  selectedLogState = this.behaviourSubjectState.asObservable();

  constructor() {
    /*this.logs = [{id: '1', text: 'Generate Components', date: new Date('12/26/2017 12:54:23')},
     {id: '2', text: 'Added Bootstrap', date: new Date('12/26/2017 12:54:23')},
     {id: '3', text: 'Added Logs component', date: new Date('12/26/2017 12:54:23')}];*/
    this.logs = [];
  }

  getLogs() {
    if (localStorage.getItem('logs') === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    return of(this.logs.sort((a, b) => {
      return b.date = a.date;
    }));
  }

  setFormLog(log: Log) {
    this.behaviourSubject.next(log);
  }

  addLogs(log: Log) {
    this.logs.unshift(log);
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(log: Log) {
    this.logs.forEach((current, index) => {
      if (log.id === current.id) {
        this.logs.splice(index, 1);
      }
    });
    localStorage.setItem('logs', JSON.stringify(this.logs));
    this.logs.unshift(log);
  }

  deleteLog(log: Log) {
    this.logs.forEach((current, index) => {
      if (current.id === log.id) {
        this.logs.splice(index, 1);
      }
    });
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  /*clearState() {
    this.behaviourSubjectState.next(true);

  }*/
}
