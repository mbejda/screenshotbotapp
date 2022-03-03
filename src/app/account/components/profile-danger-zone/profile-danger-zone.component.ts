import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/authentication/interfaces/user';

@Component({
  selector: 'app-profile-danger-zone',
  templateUrl: './profile-danger-zone.component.html',
  styleUrls: ['./profile-danger-zone.component.scss']
})
export class ProfileDangerZoneComponent implements OnInit {

  @Input() currentUser!: User | null;

  constructor() { }

  ngOnInit(): void {
  }

}
