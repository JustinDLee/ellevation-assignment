const mysql = require('mysql');
const syncMysql = require('sync-mysql');
let con = null;
let syncCon = null;

const authenticationSql = 'SELECT id FROM employee WHERE username = ? && pw = ?';
const IS_ADMIN_SQL = 'SELECT id FROM `admin` WHERE id = ?';
const IS_HR_SQL = 'SELECT id FROM hr_employee WHERE id = ?';
const EMPLOYEE_MANAGER_SQL = 'SELECT id FROM employee WHERE id = ? AND manager_id = ?';
const GET_EMPLOYEE_INFO_SQL = 'SELECT * FROM employee WHERE id = ?';

// const authenticationSql = 'SHOW TABLES;';
/**
 * Opens the database connection with the given username and password.
 */
const openConnection = (username, password) => {
    if (con) {
        console.log('MySQL database connection is already open!');
        return;
    }

    con = mysql.createConnection({
        host: "localhost",
        user: username,
        password: password,
        database: 'HR_APP'
      });

    syncCon = new syncMysql({
        host: "localhost",
        user: username,
        password: password,
        database: 'HR_APP'
    });
      
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected to MySQL");
    });
};

/**
 * Closes the current database connection.
 */
const closeConnection = () => {
    if (!con) {
        console.log('Database connection wasn\'t open!');
        return;
    }
    con.end();
    con = null;
};

/**
 * Authenticates the given user with the credentials.
 */
const authenticate = (username, password) => {
    return new Promise((resolve, reject) => {
        con.query(authenticationSql, [username, password], (error, results) => {
            if (error) throw error;
            if (results) {
                resolve(results[0].id);
            } else {
                resolve(null);
            }
        });
    });
}

const createEmployee = (userId, employeeId) => {

};

const getEmployeeInfo = (userId, employeeId) => {
    // determine whether we can view the user info or not first
    if (userCanViewInformation(userId, employeeId)) {
        console
        return syncCon.query(GET_EMPLOYEE_INFO_SQL, [employeeId]);
    } else {
        return null;
    }
};

const updateEmployeeInfo = (userId, employeeId) => {

};

const deleteEmployee = (userId, employeeId) => {

};

// TODO add and remove admin?

const addAdmin = (userId, employeeId) => {

};


const removeAdmin = (userId, employeeId) => {

};


const addHR = (userId, employeeId) => {

};


const removeHR = (userId, employeeId) => {

};

// super slow, but can be made significantly faster by using indexing
const userCanViewInformation = (userId, employeeId) => {
    // query the database
    // if userId == employeeId, return true
    if (userId == employeeId) {
        return true; // always able to view your own information
    } 

    // if we are an admin, return true
    const adminRows = syncCon.query(IS_ADMIN_SQL, [userId]);
    if (adminRows.length) {
        return true;
    }

    // if we are an hr user and the other person isn't, return true
    const hrRowsForUser = syncCon.query(IS_HR_SQL, [userId]);
    const hrRowsForEmployee = syncCon.query(IS_HR_SQL, [employeeId]);
    if (hrRowsForUser.length && !hrRowsForEmployee.length) {
        return true;
    }

    const rowForEmployee = syncCon.query(EMPLOYEE_MANAGER_SQL, [employeeId, userId]);
    return rowForEmployee.length > 0;
}

module.exports = {
    openConnection, closeConnection, authenticate, getEmployeeInfo
};