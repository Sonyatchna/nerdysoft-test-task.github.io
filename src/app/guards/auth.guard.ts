import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';
import { Navigation } from '../consts/navigationEnum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authorizationService: AuthorizationService,
    private router: Router
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    if (activeUser) {
      this.router.navigate([Navigation.list]);
      return false;
    }
    return true;
  }
}
