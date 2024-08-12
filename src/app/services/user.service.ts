import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import {
  NzNotificationDataOptions,
  NzNotificationPlacement,
  NzNotificationService,
} from 'ng-zorro-antd/notification';
import { NzMenuDirective } from 'ng-zorro-antd/menu';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
const USER_KEY = 'User';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  public userObservable: Observable<User>;
  constructor(
    private http: HttpClient,
    private notification: NzNotificationService
  ) {
    this.userObservable = this.userSubject.asObservable();
  }
  public get currentUser(): User { 
    return this.userSubject.value;
  }
  createNotification(
    type: string,
    title: string,
    content: string,
    position: NzNotificationPlacement,
    duration: number
  ): void {
    const options: NzNotificationDataOptions<{}> = {
      nzPlacement: position,
      nzDuration: duration,
    };
    this.notification.create(type, title, content, options);
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.notification.create(
            'success',
            'Login Successful',
            'You have successfully logged in!',
            { nzPlacement: 'bottomRight', nzDuration: 3000 }
          );
        },
        error: (err) => {
          this.notification.create(
            'error',
            'Login Failed',
            'You log in try again!',
            { nzPlacement: 'bottomRight', nzDuration: 3000 }
          );
        },
      })
    );
  }
  register(useRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, useRegister).pipe(
      tap( { 
        next: (user) => { 
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.notification.create(
            'success',
            'Register Successful',
            'You have successfully registered!',
            { nzPlacement: 'bottomRight', nzDuration: 3000 }
          );
        },
        error: (err) => { 
          this.notification.create(
            'error',
            'Register Failed',
            'You register try again!',
            { nzPlacement: 'bottomRight', nzDuration: 3000 }
          );
        }

      }),
    );
  }
  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    // window.location.reload();
  }
  private setUserToLocalStorage(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    return userJson ? (JSON.parse(userJson) as User) : new User();
  }
}
