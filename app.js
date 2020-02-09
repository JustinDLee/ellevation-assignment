const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const session = require('cookie-session');

app.use(bodyParser.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string',
    proxy: true,
    cookie: {
        maxAge: 1800
    }
}));

const employeeRepository = require('./employee-repository');

app.get('/', (req, res) => {
    // homepage
    res.send('Hello world!');
});

// for a given employee id, get the people who you can see
app.get('/allemployees/:employeeId', (req, res) => {
    // TODO set a cookie for the user
    const employeeId = req.params['employeeId'];
    console.log(employeeId);
    res.send(employeeId);
    // TODO fetch from the database
});

// TODO do not set this as a get, and do not store the password in plaintext in the database
app.get('/login/user/:username/password/:password', (req, res) => {
    const username = req.params.username;
    const password = req.params.password;
    employeeRepository.authenticate(username, password).then(userId => {
        if (userId) {
            req.session.userId = userId;
            res.send('Logged in for user ' + username);
        } else {
            res.status(400);
            res.send('Failed to login. Please provide a valid username and password. ' + userId);
        }
    });
    
});
app.listen(port, () => {
    console.log('server up');
    employeeRepository.openConnection('root', 'system32');
});

