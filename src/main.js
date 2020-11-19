const app = require('express')();
const Keycloak = require('keycloak-connect');
const config = require('./config');
const keycloak = new Keycloak({  }, config.get('kcConfig'));
const { tokenParser } = require('./token');
const packageJson = require('../package');
const logger = require('./logger');
const httpLogger = require('./httpLogger');

const debugMode = config.get('debugMode');
const AnonymousRole = config.get('AnonymousRole');

if (debugMode) {
    app.use(httpLogger);
    app.get('*', (res, req, next) => {
        logger.info('request header: ', res.headers);
        next();
    });
    
}

app.get('/', keycloak.middleware(), (res, req) => {
    if (!res.kauth.grant) {
        if(AnonymousRole){
            return req.status(200)
            .jsonp({
                 'X-Hasura-Role':AnonymousRole
            });
        }else{
            return req.sendStatus(401);
        }
    }

    const tokenParsed = tokenParser(res.kauth.grant, config.get('kcConfig.clientId'), debugMode);

    if (debugMode) {
        logger.info('tokenParsed: ', tokenParsed);
    }

    return req.status(200)
        .jsonp({
            ...tokenParsed,
        });
});

app.listen(config.get('port'), () => {
    const port = config.get('port');
    logger.info(`Server running on http://localhost:${ port } port`);
    logger.info(`Version ${ packageJson.version }`);
    if (config.get('debugMode')) {
        logger.info('kcConfig: ', config.get('kcConfig'));
    }
});
