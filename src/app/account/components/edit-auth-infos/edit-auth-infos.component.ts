import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/authentication/interfaces/user';

@Component({
  selector: 'app-edit-auth-infos',
  templateUrl: './edit-auth-infos.component.html',
  styleUrls: ['./edit-auth-infos.component.scss']
})
export class EditAuthInfosComponent implements OnInit {

  @Input() currentUser!: User | null;

  constructor() { }

  ngOnInit(): void {
  }

}
