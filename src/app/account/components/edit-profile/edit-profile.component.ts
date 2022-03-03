import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/authentication/interfaces/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @Input() currentUser!: User | null;

  constructor() { }

  ngOnInit(): void {
  }

}
