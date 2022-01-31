import * as moment from 'moment';

import {
  AfterViewInit, Component, EventEmitter, Output, Renderer2, ViewChild
} from '@angular/core';
import { MatCalendar } from '@angular/material';
import { of } from 'rxjs';

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
    this.setupArrowButtonListeners();

    //// Get current month/year selected in calendar to facilitate backend call
    // const month = parseInt(this.calendar.activeDate.format('M'));
    // const year = parseInt(this.calendar.activeDate.format('Y'));
    // this.backendService.getAvailableDays(month, year);

    const datesToHighlight = ['January 20, 2022', 'January 31, 2022'];

    of(datesToHighlight).subscribe((results) => {
      this.highlightDays(results);
    });
  }

  private setupArrowButtonListeners() {
    const buttons = document.querySelectorAll('.mat-calendar-previous-button, .mat-calendar-next-button');

    if (buttons) {
      Array.from(buttons).forEach(button => {
        this.renderer.listen(button, 'click', () => {
          this.monthSelected.emit(this.calendar.activeDate);
        });
      });
    }
  }

  /**
   * @param days: Array of strings to highlight in the format "February 20, 2020"
   */
  public highlightDays(days: string[]) {
    const dayElements = document.querySelectorAll(
      '.mat-calendar-table .mat-calendar-body-cell'
    );

    Array.from(dayElements).forEach((element) => {
      const matchingDay = days.find((d) => d === element.getAttribute('aria-label')) !== undefined;

      if (matchingDay) {
        this.renderer.addClass(element, 'available');
        this.renderer.setAttribute(element, 'title', 'Event 1');
      } else {
        this.renderer.removeClass(element, 'available');
        this.renderer.removeAttribute(element, 'title');
      }
    });
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
