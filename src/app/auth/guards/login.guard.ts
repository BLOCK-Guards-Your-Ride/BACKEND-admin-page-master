import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable()
export class LoginGuard extends KeycloakAuthGuard {

  constructor(protected router: Router,
              private keycloakService: KeycloakService) {
    super(router, keycloakService);
  }

  // @ts-ignore - a routera nekünk nincs szükségünk, de a felülírt metódusban szerepel mint bemeneti paraméter
  async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    if (!this.authenticated) {
      await this.keycloakService.login({
        redirectUri: window.location.origin + state.url,
      });
    }
    return this.authenticated;
  }
}
