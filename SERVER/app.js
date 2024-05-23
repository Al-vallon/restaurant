/* init express */
const express = require('express');
const app = express();
const https = require('https');
const cors = require('cors');
const fs = require('fs');

const userController = require('./src/controller/UserController.js');
const loginController = require('./src/controller/loginController.js');
const ProductController = require('./src/controller/ProductController.js');

const { verifyToken } = require('./src/isAdmin/isAdmin.js');
const { isAdmin } = require('./src/isAdmin/isAdmin.js');

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
    key: fs.readFileSync('D:/Developpement web/resto/restaurant/SERVER/server.key'),
    cert: fs.readFileSync('D:/Developpement web/resto/restaurant/SERVER/server.crt')
};

// const server = https.createServer(options, app);
const server = https.createServer({
    ...options,
    key: fs.readFileSync('D:/Developpement web/resto/restaurant/SERVER/server.key'),
    cert: fs.readFileSync('D:/Developpement web/resto/restaurant/SERVER/server.crt')
}, app);

server.on('error', (error) => {
    console.error('Erreur de serveur HTTPS :', error.message);
});

/* change body for post/put in json  */
app.use(
    express.json(),
    // cors({
    //     origin: ['https://localhost:4200', 'http://localhost:4200'],
    //     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    //     credentials: true,
    // }),
    // (err, req, res, next) => {
    //     console.error('Erreur non gérée :', err);
    //     res.status(500).json({ error: 'Erreur interne du serveur' });
    // },
);

app.use(cors({
        origin: ['https://localhost:4200', 'http://localhost:4200'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    }));

app.use('/settings', verifyToken);

app.use('/admin', verifyToken, isAdmin);

app.options('*', cors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    }
));

app.get('/', (req, res) => {
    res.send('Hello, this is the root endpoint!');
 });

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


app.get('/admin', (req, res) => {
    const userRole = req.role_id;
    
    if (userRole === 1) {
        res.status(200).json({ message: 'Accès autorisé à la page spéciale pour les administrateurs.' });
        } else {
        res.status(403).json({ message: 'Accès refusé. Vous n\'êtes pas autorisé à accéder à cette page.' });
        }
});

/**********************************************************************************
 *                                                                                *
 *                              * PRODUCT *                                       *
 *                                                                                *
 **********************************************************************************/

app.get("/product", ProductController.getProductByID);


server.listen(id.port, () => {
    console.log(nodePort,`Server is listening on port: ${id.port}`,resetColor);	
});
