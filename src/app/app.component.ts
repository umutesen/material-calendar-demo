import { Component, ViewChild } from '@angular/core';
import { CalendarComponent } from './calendar/calendar.component';
import { Moment } from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('myCalendar', { static: true })
  myCalendar: CalendarComponent;

  dateSelected(value: Moment) {
    alert(value);
  }
}
