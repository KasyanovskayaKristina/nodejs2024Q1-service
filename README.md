# Home Library Service

## Downloading

```
git clone https://github.com/KasyanovskayaKristina/nodejs2024Q1-service.git
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm run start
http://localhost:4000/users
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

### Auto-fix and format

```
npm run lint
```

```
You can use postman to check work
For example add localhost in postman and then :

1. POST => http://localhost:4000/user => Send
In body : {
  "login": "newuser@example.com",
  "password": "password123"
}

2. GET => http://localhost:4000/user/id

3.GET  => http://localhost:4000/user

4 POST => http://localhost:4000/user

5 PUT http://localhost:4000/user/id
In body : {
  "oldPassword": "password123",
  "newPassword": "password555"
}

6. DELETE http://localhost:4000/user/id

7. POST => http://localhost:4000/user ( check that user delete correctly)

You can do a similar operation with other methods and check the server response for invalid input data in the same way.
docker run -p 4000:4000 yourappname
```
