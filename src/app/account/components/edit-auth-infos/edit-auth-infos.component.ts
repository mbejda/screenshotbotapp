import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/authentication/interfaces/user';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { CustomValidators } from 'src/app/shared/custom-classes/custom-validators';
import { ModalsService } from 'src/app/shared/services/modals.service';

@Component({
  selector: 'app-edit-auth-infos',
  templateUrl: './edit-auth-infos.component.html',
  styleUrls: ['./edit-auth-infos.component.scss']
})
export class EditAuthInfosComponent implements OnInit {

  @Input() currentUser!: User;

  editPasswordForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private modalsService: ModalsService
  ) { }

  ngOnInit(): void {
    this.initEditPasswordForm();
  }

  initEditPasswordForm(): void {
    this.editPasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidators.patternValidator(/[@#!$%^:(){}<>?&*,\.\/"';=+€£]/, { hasSpecialCharacters: true }),
      ]],
      passwordConfirm: ['', [Validators.required]]
    }, {validators: CustomValidators.passwordMatchValidator});
  }

  onEditPassword(): void {
    this.modalsService.open('editPasswordModal');
  }

  onSubmitEditPasswordForm(): void {
    if (this.currentUser.email) {
      const oldPassword = this.editPasswordForm.get('oldPassword')?.value;
      const newPassword = this.editPasswordForm.get('password')?.value;
      this.authenticationService.signinUserWithEmailAndPassword(this.currentUser.email, oldPassword)
      .then(() => {
        this.currentUser.updatePassword(newPassword)
        .then(() => {
          this.modalsService.dismissAll();
          this.editPasswordForm.reset();
        }).catch(console.error);
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

}
