import { Component, Input, OnInit } from '@angular/core';
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

  constructor(
    private filesService: FilesService,
    private modalsService: ModalsService
  ) { }

  ngOnInit(): void {
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

  onEditUsername() {
    this.modalsService.open('editUsernameModal');
  }

}
