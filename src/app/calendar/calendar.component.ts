import * as moment from 'moment';

import {
    AfterViewInit, Component, EventEmitter, Output, Renderer2, ViewChild
} from '@angular/core';
import { MatCalendar } from '@angular/material';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements AfterViewInit {
  selectedDate = moment();
  minDate: moment.Moment;
  maxDate: moment.Moment;

  @Output()
  dateSelected: EventEmitter<moment.Moment> = new EventEmitter();

  @Output()
  monthSelected: EventEmitter<moment.Moment> = new EventEmitter();

  @ViewChild('calendar', { static: true })
  calendar: MatCalendar<moment.Moment>;

  constructor(private renderer: Renderer2) { }

  setMinDate() {
    this.minDate = moment().add(-10, 'day');
  }

  setMaxDate() {
    this.maxDate = moment().add(10, 'day');
  }

  ngAfterViewInit() {
    const buttons = document.querySelectorAll('.mat-calendar-previous-button, .mat-calendar-next-button');

    if (buttons) {
      Array.from(buttons).forEach(button => {
        this.renderer.listen(button, 'click', () => {
          this.monthSelected.emit(this.calendar.activeDate);
        });
      });
    }
  }

  monthChanged(date: moment.Moment) {
    this.monthSelected.emit(date);
  }

  dateChanged() {
    this.calendar.activeDate = this.selectedDate;
    this.dateSelected.emit(this.selectedDate);
  }

  prevDay() {
    const prevMoment = moment(this.selectedDate).add(-1, 'days');
    this.selectedDate = prevMoment;
    this.dateChanged();
  }

  today() {
    this.selectedDate = moment();
    this.dateChanged();
  }

  nextDay() {
    const nextMoment = moment(this.selectedDate).add(1, 'days');
    this.selectedDate = nextMoment;
    this.dateChanged();
  }
}
