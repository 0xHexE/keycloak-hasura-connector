const fs = require('fs');
const convict = require('convict');

const config = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV'
    },
    port: {
        doc: 'The port to bind.',
        format: 'port',
        default: 3000,
        env: 'PORT',
        arg: 'port'
    },
    debugMode: {
        doc: 'Is debug mode',
        format: Boolean,
        default: false,
        env: 'KEYCLOAK_DEBUG',
    },
    AnonymousRole: {
        doc: 'AnonymousRole used if the user not loged in',
        format: String,
        default: null,
        env: 'ANONYMOUS_ROLE',
    },
    UserIdField: {
        doc: 'the name of the field that will be mapped to X-Hasura-User-Id',
        format: String,
        default: 'sub',
        env: 'USER_ID_FIELD',
    },
    kcConfig: {
        clientId: {
            doc: 'Keycloak config',
            format: String,
            default: null,
            env: 'KEYCLOAK_CLIENT_ID',
        },
        bearerOnly: {
            doc: 'keycloak auth type',
            format: Boolean,
            default: true,
            env: 'KEYCLOAK_BEARER_ONLY',
        },
        serverUrl: {
            doc: 'Keycloak server url',
            format: String,
            default: null,
            env: 'KEYCLOAK_SERVER_URL',
        },
        realm: {
            doc: 'realm name keycloak',
            format: String,
            default: null,
            env: 'KEYCLOAK_REALM',
        },
        credentials: {
            secret: {
                doc: 'KEYCLOAK_SECRET',
                format: String,
                sensitive: true,
                default: null,
                env: 'KEYCLOAK_SECRET',
            },
        },
    },
});

const env = config.get('env');
const configPath = './config/' + env + '.json';

if (fs.existsSync(configPath)) {
    config.loadFile(configPath);
}

config.validate({allowed: 'strict'});

module.exports = config;
