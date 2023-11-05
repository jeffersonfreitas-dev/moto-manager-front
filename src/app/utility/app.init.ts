// import { KeycloakService } from 'keycloak-angular';
// import { environment } from 'src/environments/environment';

// const keycloakURL = environment.keycloakURL;

// export function initializeKeycloak(
//   keycloak: KeycloakService
// ): () => Promise<boolean> {
//   return () =>
//     keycloak.init({
//       config: {
//         url: keycloakURL,
//         realm: 'motomanager',
//         clientId: 'moto_front',
//       },
//       initOptions: {
//         checkLoginIframe: true,
//         checkLoginIframeInterval: 25,
//         // onLoad: 'check-sso',
//         // silentCheckSsoRedirectUri:
//         //   window.location.origin + '/assets/silent-check-sso.html'
//       },

//       loadUserProfileAtStartUp: true,
//     });
// }
