# Connect Hasura with postgres
Connect hasura with the keycloak. Project support multiple organization setup in order to achieve that you need to add the groups to the scope of the application.

## Installation
`docker pull keycloak-hasura-connector`

## Docker compose
To use the hasura and keycloak image you use the `docker-compose.yml` file. Edit the environment variables.

```
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
https://docs.hasura.io/1.0/graphql/manual/auth/common-roles-auth-examples.html

You can refere documentation here

![Alt text](screenshots/downloaded-from-hasura.png?raw=true "Title")

## Kubernates

You can use the postgres chart to deploy the postgres to kubernates. You can convert the docker-compose into kubernates file using the kompose
