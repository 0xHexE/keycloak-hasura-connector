# Connect Hasura with keycloak
Connect hasura with the keycloak. Project support multiple organization setup in order to achieve that you need to add the groups to the scope of the application.

An easy way to authenticate keycloak.

## Environment variables
```dotenv
KEYCLOAK_USERNAME=YOUR_KEYCLOAK_USER_NAME
KEYCLOAK_PASSWORD=YOUR_KEYCLOAK_PSSWORD
KEYCLOAK_CLIENT_ID=YOUR_KEYCLOAK_CLIENT_ID
```

## Prerequisite
* docker
* docker-compose

## Documentation

[docs](/docs)

## Client Examples

[Angular](examples/hasura-connector-angular)

## Kubernates

You can use the postgres chart to deploy the postgres to kubernates. You can convert the docker-compose into kubernates file using the kompose
