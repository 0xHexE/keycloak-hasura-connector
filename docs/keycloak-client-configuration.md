# Setup for keycloak

## Architecture of Keycloak Hasura Connector

![Arch](screenshot/keycloak-connector-arch.png)

## Setup the keycloak

[Installation of keycloak](keycloak-install-docker.md)

## Configure keycloak for the connector

You need to configure two clients in keycloak. One is for frontend(React, Angular, Svelte) and other for the Hasura engine.

### Create client for the frontend.
You need to create new public client in keycloak

* Login to keycloak admin. Keycloak admin url http://KEYCLOAK_URL/auth/admin
* Go to client
![Client](screenshot/client-view.png)
* Click on `Create`
![Add Client](screenshot/add-client-backend.png)
    * `Client ID` Any unique client id you want
    * `Protocol` openid-connect
    * `Root URL` Root url of the application. Now we are using the http://localhost:4200
* Click on save
![Client config](screenshot/frontend-app-config.png)

### Create client for backend
Now we will create backend for the hasura connector. It will require to verify the JWT token Obtained from the keycloak. 

* Login to keycloak admin. Keycloak admin url http://KEYCLOAK_URL/auth/admin
* Go to client
![Client](screenshot/client-view.png)
* Click on `Create`
![Backend App config](screenshot/backend-app-config.png)
* Click on save
![keycloak-connector-config.png](screenshot/keycloak-connector-config.png)
* Select the `Access Type` to `bearer only` and client on `Save`
![Keycloak public type config](screenshot/access-type-backend.png)
* Copy the Secret from Credentials
![backend-secret.png](screenshot/backend-secret.png)


### Optional step for the X-Hasura-Group-Id
`X-Hasura-Group-Id` Obtained by the group of the user. If user is added into group called as group1 then user organization id will be group1
, and for nested groups /group1/subgroup the X-Hasura-Group-Id is group1. To access the user group in token we need to add the scope for it so let get started
> Following steps may vary for various keycloak version 

* Go to the Client scopes
* Click on create
![Client scopes](screenshot/client-scope.png)

* Click on Next
![Client scope](screenshot/client-scope-next-1.png)

* Enter name `groups`
* Click on save
![Step 2](screenshot/keycloak-scope-step2.png)

* Goto mappers
* Click on create
![Step 3](screenshot/keycloak-scope-step3.png)

* Name: `groups` MapperType: `Group Membership` Token claim name `group`
![Step 4](screenshot/keycloak-scope-step4.png)

Congratulations! You have configured you keycloak for the hasura connector

[Configure keycloak with hasura connector](hasura-config.md)
