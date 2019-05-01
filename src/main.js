const app = require('express')();
const Keycloak = require('keycloak-connect');
const config = require('./config');
const keycloak = new Keycloak({  }, config.get('kcConfig'));

app.get('*', (res, req, next) => {
    console.log(`${ res.method.toUpperCase() }: ${res.url}`);
    next();
});

app.get('/', keycloak.middleware(), (res, req) => {
    if (!res.kauth.grant) {
        return req.sendStatus(401);
    }

    if (config.get('debugMode')) {
        console.log(res.kauth.grant);
    }

    const clientId = config.get('kcConfig.clientId');

    const accessToken = res.kauth.grant.access_token;

    const tokenContent = accessToken.content;

    if (!tokenContent.resource_access[clientId]) {
        console.error('Client config is not found');
        return req.sendStatus(401);
    }

    const roles = tokenContent.resource_access[clientId].roles;

    if (roles.length > 1) {
        return req.status(401).json({ error: 'Multiple roles associated with user' });
    }

    let hasuraVariables = {
        'X-Hasura-Role': roles[0] || 'anonymous',
        'X-Hasura-Realm-Role': tokenContent.realm_access.roles.join(','),
        'X-Hasura-User-Id': accessToken.sub,
    };

    if (Array.isArray(tokenContent.group)) {
        const organizationId = `${ (tokenContent.group || [])
            .sort((v1, v2) => v1.split('/').length - v2.split('/').length)[0] }`.split('/')[1];
        const subGroups = (tokenContent.group || []).map(res => res.replace(`/${ organizationId }`, '')).join(',');
        hasuraVariables['X-Hasura-Organization-Id'] = organizationId;
        hasuraVariables['X-Hasura-Sub-Groups-Id'] = subGroups;
    }

    if (config.get('debugMode')) {
        console.log(hasuraVariables);
    }

    req.status(200)
        .jsonp(hasuraVariables);
});

app.listen(config.get('port'), () => {
    const port = config.get('port');
    console.log(`Server running on http://localhost:${ port } port`);
});
