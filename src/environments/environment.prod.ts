import { KeycloakOptions } from 'keycloak-angular/lib/core/interfaces/keycloak-options';

const keycloakOptions: KeycloakOptions = {
  config: {
    url: 'https://accounts.blockcity.tech/auth',
    realm: 'block-prd',
    clientId: 'block-management-frontend-client',
  },
  initOptions: {
    checkLoginIframe: false,
  },
  enableBearerInterceptor: true,
};

export const environment = {
  production: true,
  baseUrl: 'https://api.server.blockcity.tech',
  googleMapsKey: 'AIzaSyAggyKrM7CGTMrcOZNQjeL-3GbbSe5rqvk',
  keycloakOptions: keycloakOptions,
};
