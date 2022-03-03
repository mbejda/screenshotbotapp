import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../authentication/interfaces/user';
import { AuthenticationService } from '../authentication/services/authentication.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {

  currentUserSubscription!: Subscription;
  currentUser!: User | null;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initCurrentUser();
  }

  initCurrentUser(): void {
    this.currentUserSubscription = this.authenticationService.currentUserSubject.subscribe({
      next: user => this.currentUser = user,
      error: console.error
    });
  }

  onSignout(): void {
    this.authenticationService.signoutUser()
    .then(() => {
      this.router.navigate(['/home']);
    }).catch(console.error);
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

}
