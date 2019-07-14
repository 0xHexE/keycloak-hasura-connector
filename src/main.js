const app = require('express')();
const Keycloak = require('keycloak-connect');
const config = require('./config');
const keycloak = new Keycloak({  }, config.get('kcConfig'));
const { tokenParser } = require('./token');
const packageJson = require('../package');

const debugMode = config.get('debugMode');
const AnonymousRole = config.get('AnonymousRole');

if (debugMode) {
    app.get('*', (res, req, next) => {
        console.log(res.headers);
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
        console.log(tokenParsed);
    }

    return req.status(200)
        .jsonp({
            ...tokenParsed,
        });
});

app.listen(config.get('port'), () => {
    const port = config.get('port');
    console.log(`Server running on http://localhost:${ port } port`);
    console.log(`Version ${ packageJson.version }`);
    if (config.get('debugMode')) {
        console.log(config.get('kcConfig'));
    }
});
