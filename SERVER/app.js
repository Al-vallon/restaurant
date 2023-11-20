/* init express */
const express = require('express');
const app = express();
const https = require('https');
const cors = require('cors');
const fs = require('fs');

const userController = require('./src/controller/UserController.js');
const loginController = require('./src/controller/loginController.js');

const { successColor, errorColor, resetColor, nodePort } = require('./src/asset/colorizedLog');

/* call auth middleware */
const auth = require('./src/auth/auth.js'); 

/* init sequelize */
const sequelize = require('./src/database/sequelize');

/* call one file to control 'em all */
const id = require('./config_ID');
const config_ID = require('./config_ID');

/* call DB Config */
const dbConfig = id.dbConfig;

const options = {
    key: fs.readFileSync('D:/Developpement web/project/server/server.key'),
    cert: fs.readFileSync('D:/Developpement web/project/server/server.cert')
  };
  
  const server = https.createServer(options, app);

/* change body for post/put in json  */
app.use
    (
        express.json(),
        cors({
            origin: 'https://localhost:4200',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
        })
    );

app.options('*', cors());

/**********************************************************************************
 *                                                                                *
 *                              * CRUD FOR USERS *                                *
 *                                                                                *
 **********************************************************************************/

/* Get all User */
app.get("/users", auth, userController.getAllUsers);

/* Get one User */
app.get("/users/:id", userController.getUserById);

/* Create a user */
app.post("/register", userController.createUser)

 /* Change info for user */
app.put('/users/:id', userController.updateUser)

 /* Delete selected user */
app.delete('/users/:id', userController.deleteUser);

 /* Delete all user */
app.delete('/users', userController.deleteUser);



/**********************************************************************************
 *                                                                                *
 *                              * LOGIN USERS *                                   *
 *                                                                                *
 **********************************************************************************/

app.post("/login", loginController.logUser);






server.listen(id.port, () => {
    console.log(nodePort,`Server is listening on port: ${id.port}`,resetColor);	
});