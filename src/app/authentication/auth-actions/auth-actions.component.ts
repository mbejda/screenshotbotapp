import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-actions',
  templateUrl: './auth-actions.component.html',
  styleUrls: ['./auth-actions.component.scss']
})
export class AuthActionsComponent implements OnInit {

  action!: string;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const mode = this.activatedRoute.snapshot.queryParamMap.get('mode');
    if (mode) {
      this.action = mode;
    }
  }

}
