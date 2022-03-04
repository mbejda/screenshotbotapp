import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeHeaderComponent } from './components/home-header/home-header.component';
import { SharedModule } from '../shared/shared.module';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fad } from '@fortawesome/pro-duotone-svg-icons';


@NgModule({
  declarations: [
    HomeComponent,
    HomeHeaderComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FontAwesomeModule
  ]
})
export class HomeModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fad);
  }
}
