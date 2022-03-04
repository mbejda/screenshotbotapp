import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/authentication/interfaces/user';
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

  constructor(
    private filesService: FilesService,
    private modalsService: ModalsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initUsernameForm();
  }

  initUsernameForm(): void {
    this.usernameForm = this.formBuilder.group({
      username: ['', [Validators.required]]
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

}
