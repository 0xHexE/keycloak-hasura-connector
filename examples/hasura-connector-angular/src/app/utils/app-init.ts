import { KeycloakService } from 'keycloak-angular';
import {kcConfig} from './kc';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => keycloak.init({
    config: kcConfig,

    initOptions: {
    },
  });
}
