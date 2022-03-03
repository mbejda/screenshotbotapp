import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditAuthInfosComponent } from './components/edit-auth-infos/edit-auth-infos.component';
import { ProfileDangerZoneComponent } from './components/profile-danger-zone/profile-danger-zone.component';


@NgModule({
  declarations: [
    AccountComponent,
    EditProfileComponent,
    EditAuthInfosComponent,
    ProfileDangerZoneComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
