const app = require('express')();
const Keycloak = require('keycloak-connect');
const config = require('./utils/config');
const keycloak = new Keycloak({  }, config.get('kcConfig'));
const { tokenParser } = require('./utils/token');
const packageJson = require('../package');
const logger = require('./utils/logger');
const httpLogger = require('./middlewares/httpLogger');

const debugMode = config.get('debugMode');
const AnonymousRole = config.get('AnonymousRole');

if (debugMode) {
    logger.info('AnonymousRole: ', AnonymousRole);
    app.use(httpLogger);
    app.get('*', (req, res, next) => {
        logger.info('request header: ', req.headers);
        next();
    });
    
}

app.get('/', keycloak.middleware(), (req, res) => {
    if (!req.kauth.grant) {
        if(AnonymousRole){
            return res.status(200)
            .jsonp({
                 'X-Hasura-Role':AnonymousRole
            });
        }else{
            return res.sendStatus(401);
        }
    }

    const tokenParsed = tokenParser(req.kauth.grant, config.get('kcConfig.clientId'), debugMode);

    if (debugMode) {
        logger.info('tokenParsed: ', tokenParsed);
    }

    return res.status(200)
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
