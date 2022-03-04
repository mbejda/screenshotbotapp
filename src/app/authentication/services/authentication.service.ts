import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { UserCredentials } from '../interfaces/user-credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(
    private auth: AngularFireAuth
  ) {
    this.auth.useDeviceLanguage().catch(console.error);
    this.auth.onAuthStateChanged(user => {
      this.currentUserSubject.next(user);
    }, console.error);
  }

  getCurrentUserTokenIdAsObservable(): Observable<string> {
    if (this.currentUserSubject.value) {
      return from(this.currentUserSubject.value.getIdToken());
    } else {
      return throwError(() => new Error('No user logged in'));
    }
  }

  signupUserWithEmailAndPassword(email: string, password: string): Promise<UserCredentials> {
    return new Promise((resolve, reject) => {
      this.auth.createUserWithEmailAndPassword(email, password).then(resolve).catch(reject);
    });
  }

  signinUserWithEmailAndPassword(email: string, password: string): Promise<UserCredentials> {
    return new Promise((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(email, password).then(resolve).catch(reject);
    });
  }

  signoutUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth.signOut().then(resolve).catch(reject);
    });
  }

  updateCurrentUser(user: User): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth.updateCurrentUser(user).then(() => {
        this.currentUserSubject.next(user);
        resolve();
      }).catch(reject);
    });
  }

  verifyEmail(actionCode: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth.applyActionCode(actionCode)
      .then(() => {
        this.auth.currentUser.then(currentUser => {
          if (!currentUser) {
            return reject(new Error('No user logged in'));
          }
          currentUser.reload().then(() => {
            this.currentUserSubject.next(currentUser);
          }).catch(resolve);
          resolve();
        }).catch(resolve);
      }).catch(reject);
    });
  }

  sendPasswordResetEmail(email: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth.sendPasswordResetEmail(email).then(resolve).catch(reject);
    });
  }

  resetPassword(actionCode: string, newPassword: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth.confirmPasswordReset(actionCode, newPassword)
      .then(resolve).catch(reject);
    });
  }

}
