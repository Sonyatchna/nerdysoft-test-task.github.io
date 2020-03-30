import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {

  constructor(
    private authorizationService: AuthorizationService,
    private location: Location
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    if (!activeUser) {
      this.location.back();
      return false;
    }
    return true;
  }
}
