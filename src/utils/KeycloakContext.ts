import Keycloak from 'keycloak-connect';

export const CONTEXT_KEY = 'kauth';

export class KeycloakContext {
  public readonly request: Keycloak.GrantedRequest;

  public readonly accessToken: Keycloak.Token | undefined;

  public static contextKey = CONTEXT_KEY;

  constructor({ req }: { req: Keycloak.GrantedRequest }) {
    const token = req && req.kauth && req.kauth.grant ? req.kauth.grant.access_token : undefined;
    this.accessToken = token;
    this.request = req;
  }
}
