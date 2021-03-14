import { Moment } from 'moment';

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  dateSelected(value: Moment) {
    alert(value);
  }

  monthSelected(value: Moment) {
    alert(value);
  }
}
