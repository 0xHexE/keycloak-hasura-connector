import express from 'express';
import cors from 'cors';
import Keycloak from 'keycloak-connect';
import config from './config';
import packageJson from '../package.json';
import { tokenParser } from './utils/TokenParser';
import { KeycloakContext } from './utils/KeycloakContext';
import logger from './utils/Logger';

const app = express();
const keycloak = new Keycloak({}, config.get('kcConfig'));
const AnonymousRole = config.get('AnonymousRole');
const debugMode = config.get('debugMode');

app.use(cors());

if (debugMode) {
  app.get('*', (req, _res, next: express.NextFunction) => {
    logger.log({
      level: 'debug',
      message: JSON.stringify(req.headers),
    });
    next();
  });
}

// eslint-disable-next-line
app.get('/', keycloak.middleware(), (req: any, res: express.Response) => {
  const reqkauth = new KeycloakContext({ req });

  if (!reqkauth) {
    if (AnonymousRole) {
      return res.status(200).jsonp({
        'X-Hasura-Role': AnonymousRole,
      });
    }
    return res.sendStatus(401);
  }

  const tokenParsed = tokenParser(req.kauth.grant, config.get('kcConfig.clientId'), debugMode);

  if (debugMode) {
    logger.log({
      level: 'debug',
      message: JSON.stringify(tokenParsed),
    });
  }

  return res.status(200).jsonp({
    ...tokenParsed,
  });
});

const port = config.get('port');

app.listen(port, () => {
  logger.log({
    level: 'info',
    message: `Server running on http://localhost:${port} port`,
  });
  logger.log({
    level: 'info',
    message: `Version ${packageJson.version}`,
  });

  if (config.get('debugMode')) {
    logger.log({
      level: 'debug',
      message: JSON.stringify(config.get('kcConfig')),
    });
  }
});
