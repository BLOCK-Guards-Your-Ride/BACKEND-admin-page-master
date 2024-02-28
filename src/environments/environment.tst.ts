import { KeycloakOptions } from 'keycloak-angular/lib/core/interfaces/keycloak-options';

const keycloakOptions: KeycloakOptions = {
  config: {
    url: 'https://accounts.blockcity.tech/auth',
    realm: 'block-tst',
    clientId: 'block-management-frontend-client',
  },
  initOptions: {
    checkLoginIframe: false,
  },
  enableBearerInterceptor: true,
};

export const environment = {
  production: false,
  baseUrl: 'https://api.tst.server.blockcity.tech',
  googleMapsKey: 'AIzaSyAggyKrM7CGTMrcOZNQjeL-3GbbSe5rqvk',
  keycloakOptions: keycloakOptions,
};
