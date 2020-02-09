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

app.get('/employee/:employeeId', (req, res) => {
    const reqUserId = req.session.userId;
    const employeeId = req.params.employeeId;
    if (!reqUserId) {
        res.status(400);
        res.send('Not logged in. Cannot view employee information.');
    }
    // determine if the user can view this employee's information or not
    const employeeInfo = employeeRepository.getEmployeeInfo(reqUserId, employeeId);
    if (employeeInfo) {
        res.send(employeeInfo);
    } else {
        res.send('Cannot fetch employee information for employee ' + employeeId);
    }
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

// add user
app.get('/createuser/user/:username/password/:password', (req, res) => {

});
// update user
app.get('/updateuser/user/:userId', (req, res) => {

});
// delete user
app.get('/deleteuser/user/:userId', (req, res) => {

});
// add admin
app.get('/addadmin/user/:userId', (req, res) => {

});
// remove admin
app.get('/removeadmin/user/:userId', (req, res) => {

});
// set manager
app.get('/setmanager/user/:userId', (req, res) => {

});
// add hr
app.get('/addhr/user/:userId', (req, res) => {

});
app.get('/removehr/user/:userId', (req, res) => {

});
// edit employee information
app.listen(port, () => {
    console.log('server up');
    employeeRepository.openConnection('root', 'system32');
});

