import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/authentication/interfaces/user';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {

  @Input() currentUser!: User | null;

  constructor() { }

  ngOnInit(): void {
  }

}
