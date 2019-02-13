# keycloak-hasura-connector
Connect hasura with the keycloak

# Installation
`docker pull keycloak-hasura-connector`

# Docker compose
To use the hasura and keycloak image you use the `docker-compose.yml` file. Edit the environment variables.

```
KEYCLOAK_CLIENT_ID: Client ID For the keycloak
KEYCLOAK_SERVER_URL: Keycloak Server url
KEYCLOAK_REALM: Keycloak Realm
KEYCLOAK_SECRET: Keycloak Secret
```


# Kubernates

You can use the postgres chart to deploy the postgres to kubernates. You can convert the docker-compose into kubernates file using the kompose
