import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../authentication/interfaces/user';
import { AuthenticationService } from '../authentication/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  currentUser!: User | null;
  currentUserSubscription!: Subscription;

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.currentUserSubscription = this.authenticationService.currentUserSubject.subscribe({
      next: user => this.currentUser = user,
      error: console.error
    });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

}
