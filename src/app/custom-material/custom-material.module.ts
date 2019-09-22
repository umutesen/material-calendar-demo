import { NgModule } from '@angular/core';
import { MatDatepickerModule, MatButtonModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  imports: [
    MatMomentDateModule,
    MatDatepickerModule,
    MatButtonModule
  ],
  exports: [
    MatDatepickerModule,
    MatButtonModule
  ]
})
export class CustomMaterialModule {
}
