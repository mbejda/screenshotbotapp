import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthActionsComponent } from './auth-actions/auth-actions.component';
import { PasswordResetComponent } from './auth-actions/password-reset/password-reset.component';
import { VerifyEmailComponent } from './auth-actions/verify-email/verify-email.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/pro-regular-svg-icons';
import { fad } from '@fortawesome/pro-duotone-svg-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    AuthActionsComponent,
    PasswordResetComponent,
    VerifyEmailComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthenticationModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(far, fad);
  }
}
