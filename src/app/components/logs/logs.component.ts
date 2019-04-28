import { Component, OnInit } from '@angular/core';
import { LogService} from '../../services/log.service';
import {Log} from '../../models/log';


@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs: Log[];
  selectedLog: Log;
  loaded: boolean = false;

  constructor(private logService: LogService) {}

  ngOnInit() {
     this.logService.selectedLogState.subscribe(clear => {
       if(clear) {
         this.selectedLog = {
           id: '', text: '', date: ''
         }
       }
     });
     this.logService.getLogs().subscribe( logs => {
       this.logs = logs;
        this.loaded = true;});
  }
  onSelect(log: Log) {
     this.logService.setFormLog(log);
     this.selectedLog = log;
  }
  deleteLog(log: Log) {
    if(confirm("Are You Sure")) {
      this.logService.deleteLog(log);
    }
  }
}
