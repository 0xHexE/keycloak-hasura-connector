# Connect Hasura with postgres
Connect hasura with the keycloak. Project support multiple organization setup in order to achieve that you need to add the groups to the scope of the application.

## Installation
`docker pull keycloak-hasura-connector`

## Docker compose
To use the hasura and keycloak image you use the `docker-compose.yml` file. Edit the environment variables.

```yml
KEYCLOAK_CLIENT_ID: Client ID For the keycloak
KEYCLOAK_SERVER_URL: Keycloak Server url
KEYCLOAK_REALM: Keycloak Realm
KEYCLOAK_SECRET: Keycloak Secret
```

## Setup Keycloak
You can setup keycloak with the hasura.

1) Add new user to the keycloak
`Manage->Users->Add user`
![Alt text](screenshots/add-user.png?raw=true "Title")

2) Create a organization group
`Manage->Groups->New`
![Alt text](screenshots/add-group.png?raw=true "Title")

3) Create an client (Note: Select Access Type: bearer only)
`Configure->Clients->Create`
![Alt text](screenshots/add-client.png?raw=true "Title")

4) Goto credentials tab and copy the secret

## Setup environment 

Download the docker-compose.yml file from this repo or run this command

```bash
curl https://raw.githubusercontent.com/httpsOmkar/keycloak-hasura-connector/master/docker-compose.yml
```

Edit the variables in the docker-compose.yml
```yml
KEYCLOAK_CLIENT_ID: CLIENT ID FROM THE STEP 3
KEYCLOAK_SERVER_URL: URL of the keycloak
KEYCLOAK_REALM: REALM NAME OF THE KEYCLOAK USSUALLY master
KEYCLOAK_SECRET: SECRET COPIED FROM THE STEP 4
```

And run
`docker-compose up -d`

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

## Example

```javascript
fetch("http://HASURA_ENDPOINT", {
    "credentials":"include",
    "headers":{
        "accept":"application/json, text/plain, */*",
        "authorization":"bearer ACCESS_TOKEN",
        "content-type":"application/json"
    },
    "referrerPolicy":"no-referrer-when-downgrade",
    "body":"{\"operationName\":null,\"variables\":{},\"query\":\"{\\n  product {\\n    id\\n    name\\n    description\\n    __typename\\n  }\\n}\\n\"}",
    "method":"POST"
});
```

## Client Examples

[Angular](examples/hasura-connector-angular)

## Kubernates

You can use the postgres chart to deploy the postgres to kubernates. You can convert the docker-compose into kubernates file using the kompose
