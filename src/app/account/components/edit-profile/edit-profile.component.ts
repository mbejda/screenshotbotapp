import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/authentication/interfaces/user';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { FilesService } from 'src/app/files/services/files.service';
import { ModalsService } from 'src/app/shared/services/modals.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @Input() currentUser!: User;

  photoUploading = false;

  usernameForm!: FormGroup;
  emailForm!: FormGroup;

  sendEmailDelay = 60;

  constructor(
    private filesService: FilesService,
    private modalsService: ModalsService,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.initUsernameForm();
    this.initEmailForm();
  }

  initUsernameForm(): void {
    this.usernameForm = this.formBuilder.group({
      username: ['', [Validators.required]]
    });
  }

  initEmailForm(): void {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onChangePhotoInput($event: Event): void {
    const target = <HTMLInputElement><EventTarget>$event.target;
    const file = target && target.files ? target.files[0] : null;
    if (!file) {
      return;
    }
    this.photoUploading = true;
    this.filesService.uploadFile(file).subscribe({
      next: value => {
        if (value && value.downloadURL) {
          this.currentUser.updateProfile({photoURL: value.downloadURL})
          .then(() => {
            this.photoUploading = false;
          }).catch(console.error);
        }
      },
      error: console.error,
      complete: () => {
        this.photoUploading = false;
      }
    });
  }

  onEditUsername(): void {
    this.usernameForm.get('username')?.setValue(this.currentUser.displayName ? this.currentUser.displayName : '');
    this.modalsService.open('editUsernameModal');
  }

  onSubmitUsernameForm(): void {
    const newUsername = this.usernameForm.get('username')?.value;
    this.currentUser.updateProfile({displayName: newUsername})
    .then(() => {
      this.modalsService.dismissAll();
    }).catch(console.error);
  }

  onEditEmail(): void {
    this.emailForm.get('email')?.setValue(this.currentUser.email);
    this.modalsService.open('editEmailModal');
  }

  onSubmitEmailForm(): void {
    const email = this.emailForm.get('email')?.value;
    const password = this.emailForm.get('password')?.value;
    if (this.currentUser.email) {
      this.authenticationService.signinUserWithEmailAndPassword(this.currentUser.email, password)
      .then(() => {
        this.currentUser.updateEmail(email)
        .then(() => {
          this.modalsService.dismissAll();
          this.emailForm.reset();
        }).catch(console.error);
      }).catch(error => {
        if (error.code === 'auth/wrong-password') {
          alert('Wrong password');
        }
        if (error.code === 'auth/user-not-found') {
          alert('User not found');
        }
        console.error(error);
      })
    }
  }

  onAskVerifyEmail(): void {
    this.currentUser.sendEmailVerification().then(() => {
      this.sendEmailDelay = 60;
      if (this.sendEmailDelay > 0) {
        const interval = setInterval(() => {
          this.sendEmailDelay = this.sendEmailDelay - 1;
          if (this.sendEmailDelay === 0) {
            clearInterval(interval);
          }
        }, 1000);
      }
    }).catch(error => {
      if (error.code === 'auth/too-many-requests') {
        this.sendEmailDelay = 60;
        if (this.sendEmailDelay > 0) {
          const interval = setInterval(() => {
            this.sendEmailDelay = this.sendEmailDelay - 1;
            if (this.sendEmailDelay === 0) {
              clearInterval(interval);
            }
          }, 1000);
        }
        return;
      }
      console.error(error);
    });
  }

}
