

# Surge global dev assignment
### Akila Liyanage

This application contains 2 main repos, front end and backend in 2 seperate folders names "fe" and "be"



## Manual Installation

Navigate into FE folder to install dependancies

```bash
  cd ./fe
  npm install
```

Navigate into BE folder to install dependancies

```bash
  cd ../be
  npm install
```

## Manual Running the appllication

Open 2 terminal tabs in the both fe and be folder

inside the BE folder, run;

```bash
npm run dev
```

inside the FE folder, run;

```bash
npm start
```

## Migration
Inside the root folder, run the ```migration.sh``` file with execitable rights to clone the code from the github and create the .env files



    
## Deployment

### Running the application using docker-compose
navigate to the root folder of the application

Run;

```
docker-compose up
```


## API Reference

#### Create new todo

```http
  POST /api/v1/todo/create
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**. Your access token key |

Payload:

```
{
    "name": String,
    "description": String,
    "createdBy": String,
    "date": String,
    "status": String, //todo, inprogess, done
    "file": String
}
```

#### Get all todos

```http
  GET /api/vi/todo/list-all/:user
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user`      | `string` | **Required**. Id of the user to fetch |


#### Change the status of a todo

```http
  POST /api/vi/todo/change-status/:id/:status
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `todo id`      | `string` | **Required**. Id of the todo to fetch |
| `status`      | `string` | **Required**. New status of the todo |


## Referenced projects

[node-js-authentication-with-auth0-3546](https://dev.to/itz_salemm/node-js-authentication-with-auth0-3546)

[Auth0 Developer Resources](https://developer.auth0.com/resources/code-samples/full-stack/hello-world/basic-role-based-access-control/spa/react-javascript/express-javascript)

[Auth0 Developer Resources](https://javascript.plainenglish.io/how-to-upload-files-to-aws-s3-in-react-591e533d615e)

