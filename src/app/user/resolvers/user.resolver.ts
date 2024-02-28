import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserInfoType } from '../../shared/models/user';
import { UserService } from '../services/user.service';

@Injectable()
export class UserResolver implements Resolve<UserInfoType> {

  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot): UserInfoType | Observable<UserInfoType> | Promise<UserInfoType> {
    return this.userService.getUser(route.params.userId);
  }

}
