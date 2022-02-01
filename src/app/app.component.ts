import { Moment } from 'moment';

import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private renderer: Renderer2) { }

  dateSelected(value: Moment) {
    alert(value);
  }

  monthSelected(value: Moment) {
    alert(value);

    //// Get current month/year selected in calendar to facilitate backend call
    // const month = parseInt(this.calendar.activeDate.format('M'));
    // const year = parseInt(this.calendar.activeDate.format('Y'));
    // this.backendService.getAvailableDays(month, year);

    this.highlightDays(['January 20, 2022', 'January 31, 2022']);
    this.disableDays(['January 3, 2022', 'January 15, 2022']);
  }

  /**
   * @param days: Array of strings in the format "February 20, 2020"
   */
  private highlightDays(days: string[]) {
    const dayElements = document.querySelectorAll(
      'mat-calendar .mat-calendar-table .mat-calendar-body-cell'
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

  /**
   * @param days: Array of strings in the format "February 20, 2020"
   */
  private disableDays(days: string[]) {
    const dayElements = document.querySelectorAll(
      'mat-calendar .mat-calendar-table .mat-calendar-body-cell'
    );

    Array.from(dayElements).forEach((element) => {
      const matchingDay = days.find((d) => d === element.getAttribute('aria-label')) !== undefined;

      if (matchingDay) {
        this.renderer.setAttribute(element, 'disabled', '');
        this.renderer.setAttribute(element, 'title', 'Unavailable');
      } else {
        this.renderer.removeAttribute(element, 'disabled');
        this.renderer.removeAttribute(element, 'title');
      }
    });
  }
}
