# Connect Hasura with keycloak

[![Greenkeeper badge](https://badges.greenkeeper.io/httpsOmkar/keycloak-hasura-connector.svg)](https://greenkeeper.io/)

Connect hasura with the keycloak. Project support multiple organization setup in order to achieve that you need to add the groups to the scope of the application.

An easy way to authenticate keycloak.

## Environment variables
```dotenv
KEYCLOAK_USERNAME=YOUR_KEYCLOAK_USER_NAME
KEYCLOAK_PASSWORD=YOUR_KEYCLOAK_PSSWORD
KEYCLOAK_CLIENT_ID=YOUR_KEYCLOAK_CLIENT_ID
AUTH_MODE=single|organization
```

## Prerequisite
* docker
* docker-compose

## Setup

```bash
wget https://raw.githubusercontent.com/httpsOmkar/keycloak-hasura-connector/master/install-manifests/docker-compose.yml
```

Edit the variables in the .env
```yml
KEYCLOAK_USERNAME=keycloak
KEYCLOAK_PASSWORD=keycloak
KEYCLOAK_CLIENT_ID=demo-app
AUTH_MODE=single|multiple
```

And run
`docker-compose up -d`

We currently support two authentication modes in which
* Single user authentication
    * In this you will get only User ID and Role 
* Group or Organization based authentication
    * In this you will get only User ID, Role and Organization ID  

### Single user
To setup you will need setup keycloak first. To get the user id in the token you will need to add the token claim `id`.

* Setup Client

    * Open your keycloak admin console
    
    * Create a client for frontend `Clients -> Create`
    
        * Click on create
        * Set the client id and click next
        * And `Access type` to public.
        * Set your redirect url `base url`, `admin url`, `base url` and `web origins` to your app.
    
    * We need another client for our hasura backend. Follow above procedure and change the `Access Type` to `bearer-only` in step 3. and click on save.
    
    * Goto `credentials` tab and copy the secret.
    
* Setup scope
    
    * Add ID into the scope
    
        * Select no template and Next
        
        * Put name as id and save
        
        * Then click on mappers
        
        * Click on create
        
        * Put `Name` and select the `Mapper Type` to `User property`
        
        * Set `Property` to `id`, `Token Claim Name` to id and `Claim JSON Type` to String. Leave all ticks to on.  

* Set the environment variables  
    ```dotenv
      KEYCLOAK_CLIENT_ID=KEYCLOAK_CLIENT_ID
      KEYCLOAK_SERVER_URL=KEYCLOAK_URL
      KEYCLOAK_REALM=KEYCLOAK_REALM
      KEYCLOAK_SECRET=KEYCLOAK_SECRET # Coped secret from credentials tab
      AUTH_MODE=single # single|organization
    ```
* And start the docker-compose.

## Setup Hasura
Setup hasura

1) After setup you can visit hasura app at http://localhost:8080/console
![Alt text](screenshots/hasura-dashboard.png?raw=true "Title")

2) Create an table
`Data->Create Table`
![Alt text](screenshots/hasura-setup.png?raw=true "Title")

3) Setup Permissions
`Data->TableName->Permissions`
![Alt text](screenshots/hasura-permission.png?raw=true "Title")

4) Extra permission checks
`Data->TableName->Permissions`
In this you can limit to the user to query the data
![Alt text](screenshots/extra-permission.png?raw=true "Title")

> Now you need to query the server with header Authorization with value `Bearer ${ access_token }`

## Websockets
To add support for websocket

```js
const connectionParam = {
    headers: {
        Authorization: `Bearer ${ token }`
    },
};
```

## Client Examples

[Angular](examples/hasura-connector-angular)

## Kubernates

You can use the postgres chart to deploy the postgres to kubernates. You can convert the docker-compose into kubernates file using the kompose
