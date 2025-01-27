import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private _keycloak: Keycloak;

  constructor() {
    this._keycloak = new Keycloak({
      url: environment.keycloakAuthenticationUrl,
      clientId: environment.keycloakClientId,
      realm: environment.keycloakRealm,
    });

    this._keycloak.init({ onLoad: 'check-sso', checkLoginIframe: false })
  }

  redirectToLoginPage(): Promise<void> {
    return this._keycloak.login();
  }

  isLoggedIn(): boolean {
    return this._keycloak.authenticated === undefined ? false : this._keycloak.authenticated;
  }

  logout(): Promise<void> {
    return this._keycloak.logout();
  }

  getToken(): string | undefined {
    return this._keycloak.token;
  }

  isInitiated(): boolean {
    return this._keycloak.didInitialize;
  }
}
