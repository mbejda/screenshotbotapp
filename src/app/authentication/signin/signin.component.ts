import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.initSigninForm();
  }

  initSigninForm(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmitSigninForm(): void {
    const email: string = this.signinForm.get('email')?.value;
    const password: string = this.signinForm.get('password')?.value;
    this.authenticationService.signinUserWithEmailAndPassword(email, password)
    .then(() => {
      this.router.navigate(['home', 'account']);
    }).catch(error => {
      if (error.code === 'auth/wrong-password') {
        alert('Wrong password');
      }
      if (error.code === 'auth/user-not-found') {
        alert('User not found');
      }
      console.error(error);
    });
  }

}
