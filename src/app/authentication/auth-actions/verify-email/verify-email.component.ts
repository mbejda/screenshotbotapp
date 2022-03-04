import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../interfaces/user';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit, OnDestroy {

  currentUserSubscription!: Subscription;
  currentUser!: User | null;

  oobCode!: string | null;
  emailVerificationLoading = true;

  constructor(
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.oobCode = this.activatedRoute.snapshot.queryParamMap.get('oobCode');
    if (this.oobCode) {
      this.verifyUserEmail();
    } else {
      this.initCurrentUser();
    }
  }

  initCurrentUser(): void {
    this.currentUserSubscription = this.authenticationService.currentUserSubject.subscribe({
      next: (user) => {
        this.currentUser = user;
        if (!this.currentUser) {
          this.router.navigate(['auth', 'signin']);
        }
        if (this.currentUser && this.currentUser.emailVerified) {
          this.router.navigate(['home', 'account']);
        }
      },
      error: console.error
    });
  }

  verifyUserEmail(): void {
    if (this.oobCode) {
      this.authenticationService.verifyEmail(this.oobCode)
      .then(() => {
        this.emailVerificationLoading = false;
        setTimeout(() => {
          this.router.navigate(['home', 'account']);
        }, 3000);
      }).catch(error => {
        if (error.code === 'auth/invalid-action-code') {
          alert('Validation link is wrong or expired');
        }
        console.error(error);
      });
    }
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

}
