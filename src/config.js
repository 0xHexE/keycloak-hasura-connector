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
