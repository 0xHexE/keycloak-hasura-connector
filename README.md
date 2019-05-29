<p align="center">
  <a href="https://github.com/httpsOmkar/keycloak-hasura-connector">
    <img src="logo.png" width="250px" alt="Keycloak Hasura Connector" />
  </a>
</p>

---

<h1 align="center">.:. Keycloak Hasura Connector .:. </h1>
<h4 align="center">Production Ready Authentication solution for Hasura</h4>


Connect Hasura with the Keycloak. Project support multiple organization setup in order to achieve that you need to add the groups to the scope of the application.

An easy way to authenticate Keycloak.

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

You can use the Postgres chart to deploy the Postgres to Kubernates. You can convert the docker-compose into Kubernates file using the Kompose
