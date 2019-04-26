import { Component, OnInit } from '@angular/core';
import {LogService} from '../../services/log.service';
@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  id: string;
  text: string;
  date: any;
    isNew: boolean = true;

  constructor(private logService: LogService) {
  }

  ngOnInit() {
    // Subscribe to the selectedLog observable
    this.logService.selectedLog.subscribe( log => {
      if (log.id != null) {
        this.isNew = false;
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
      }
    });
     }


     onSubmit() {
     if(this.isNew) {
        const newLog = {
          id: this.generateUUID(),
          text: this.text,
          date: new Date()
        }
       this.logService.addLogs(newLog);

     }
     else {

        const updateLog = {
          id: this.id,
          text : this.text,
          date: new Date()
        }
        this.logService.updateLog(updateLog);

       }
     this.clearState();
        }

        clearState() {
    this.isNew = true;
    this.id = '';
    this.text = '';
    this.date = '';
        }

  generateUUID() { return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  }

}

