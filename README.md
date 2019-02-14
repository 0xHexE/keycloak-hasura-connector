# keycloak-hasura-connector
Connect hasura with the keycloak. Project support multiple organization setup in order to achieve that you need to add the groups to the scope of the application.

# Groups setup

To achieve the multiple organization setup you need to add to the groups like
```
/ORGANIZATION_ID/subGroup
```

# Installation
`docker pull keycloak-hasura-connector`

# Setup Keycloak

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
