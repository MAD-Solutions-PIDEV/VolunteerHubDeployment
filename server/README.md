# VolunteerHub
Server side

## Run server
`cd server`
`npm run dev`

## Documentation
### Two directory 
src/BackEnd/~ : that contain file 
- src/BackEnd/Layout/Dashboard.js : call components using `<oulet />` ,Sidebar and header are fixed at the same file 
- src/BackEnd/Modules : must have all the modules every module should have a directory containing all the required files.js
#### Example (User) :
- src/BackEnd/Modules/User/add.js
- src/BackEnd/Modules/User/list.js
- src/BackEnd/Modules/User/update.js

### MongoDB
contain one file contain db.js 
### models
All the classes should be here
### Routes
routes/UserRoute.js :
Where we should implement our API 

### Server.js
Express main PP

## SignUp Route
 `localhost:4000/api/auth/signup`

## User Schema
`{
    "firstName": "string",
    "lastName": "string",
    "image": "string",
    "phone": "string",
    "gender": "male",
    "username": "string",
    "email": "string",
    "password": "string",
    "googleId": "String",
    "status": "active",
    "lastLogin": "string",
    "address": {
        "firstAddress": "string",
        "secondAddress": "string",
        "country": "String",
        "zipCode": "String",
        "state": "String"
    },
    "roles": ["admin","volunteer","organization","host]
}`

#### Port 4000
