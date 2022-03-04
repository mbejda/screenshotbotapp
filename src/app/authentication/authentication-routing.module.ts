import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthActionsComponent } from './auth-actions/auth-actions.component';
import { VerifyEmailComponent } from './auth-actions/verify-email/verify-email.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'email-verify', component: VerifyEmailComponent },
  { path: 'actions', component: AuthActionsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
