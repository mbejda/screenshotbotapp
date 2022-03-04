import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/shared/custom-classes/custom-validators';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initSignupForm();
  }

  initSignupForm(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidators.patternValidator(/[@#!$%^:(){}<>?&*,\.\/"';=+€£]/, { hasSpecialCharacters: true }),
      ]],
      passwordConfirm: ['', [Validators.required]],
      termsCheck: [false, [Validators.requiredTrue]]
    }, {validators: CustomValidators.passwordMatchValidator});

    this.signupForm.get('password')?.valueChanges.subscribe({
      next: val => {
        console.log(this.signupForm.get('email')?.errors)
      },
      error: console.error
    })
  }

  onSubmitSignupForm(): void {
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
    // this.signupForm.get('password')?.hasError('hasNumber');
    this.authenticationService.signupUserWithEmailAndPassword(email, password)
    .then(() => {
      this.router.navigate(['home', 'account']);
    }).catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        alert('Email already in use');
      }
      console.error(error);
    });
  }

}
