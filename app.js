const express = require('express');
const path = require ('path');
const {app_port } = require ('./config');
const cors = require('cors')
const bodyParser = require ('body-parser')
const pageRoutes = require('./routes/pageroute');
const authenticationRoutes = require('./routes/authentication');

//
//creating server
const app = express();
const server = require ('http').createServer(app);
//Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use(pageRoutes);
app.use(authenticationRoutes);

//Start Server
server.listen(app_port, () => {
    console.log(`Server is running on port" ${app_port}`)
});

