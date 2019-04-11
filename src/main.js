const app = require('express')();
const Keycloak = require('keycloak-connect');
const config = require('./config');
const keycloak = new Keycloak({  }, config.get('kcConfig'));

app.get('/', keycloak.middleware(), (res, req) => {
    if (!res.kauth.grant) {
        return req.sendStatus(401);
    }

    const clientId = config.get('kcConfig.clientId');

    const tokenContent = res.kauth.grant.access_token.content;

    if (!tokenContent.resource_access[config.get(clientId)]) {
        console.error('Client config is not found');
        req.sendStatus(401);
    }

    const roles = tokenContent.resource_access[clientId].roles;

    let hasuraVariables = {};

    switch (config.get('authMode')) {
        case 'organization':
            const organizationId = `${ (tokenContent.group || [])
                .sort((v1, v2) => v1.split('/').length - v2.split('/').length)[0] }`.split('/')[1];
            const subGroups = (tokenContent.group || []).map(res => res.replace(`/${ organizationId }`, '')).join(',');
            hasuraVariables['X-Hasura-Organization-Id'] = organizationId;
            hasuraVariables['X-Hasura-Sub-Groups-Id'] = subGroups;
    }

    if (roles.length > 1) {
        return req.status(401).json({ error: 'Multiple roles associated with user' });
    }

    hasuraVariables = {
        'X-Hasura-Role': roles[0] || 'anonymous',
        'X-Hasura-Realm-Role': tokenContent.realm_access.roles.join(','),
        'X-Hasura-User-Id': tokenContent.id,
    };

    req.status(200)
        .jsonp(hasuraVariables);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000 port');
});
