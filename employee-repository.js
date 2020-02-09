const mysql = require('mysql');
const syncMysql = require('sync-mysql');
let con = null;
let syncCon = null;

const authenticationSql = 'SELECT id FROM employee WHERE username = ? && pw = ?';
const IS_ADMIN_SQL = 'SELECT id FROM `admin` WHERE id = ?';
const IS_HR_SQL = 'SELECT id FROM hr_employee WHERE id = ?';
const EMPLOYEE_MANAGER_SQL = 'SELECT id FROM employee WHERE id = ? AND manager_id = ?';
const GET_EMPLOYEE_INFO_SQL = 'SELECT * FROM employee WHERE id = ?';
const GET_SALARY_HISTORY_SQL = 'SELECT * FROM salary_history WHERE employee_id = ?';

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
            if (results.length) {
                resolve(results[0].id);
            } else {
                resolve(null);
            }
        });
    });
}

const getEmployeeInfo = (userId, employeeId) => {
    // determine whether we can view the user info or not first
    if (userCanViewInformation(userId, employeeId)) {
        return syncCon.query(GET_EMPLOYEE_INFO_SQL, [employeeId]);
    } else {
        return null;
    }
};

const updateEmployeeInfo = (userId, employeeId, employee) => {
    if (userCanEditInformation(userId, employeeId)) {
        // update employee
    } else {
        return null;
    }
};

const deleteEmployee = (userId, employeeId) => {
    if (userCanEditPermissions(userId)) {
        // delete employee
    } else {
        return null;
    }
};

const getSalaryHistory = (userId, employeeId) => {
    if (userCanViewInformation(userId, employeeId)) {
        return syncCon.query(GET_SALARY_HISTORY_SQL, [employeeId]);
    } else {
        return null;
    }
}

const addSalaryHistory = (userId, employeeId, salary) => {
    if (userCanEditInformation(userId, employeeId)) {
        // insert salary information
    } else {
        return null;
    }
}

const addAdmin = (userId, employeeId) => {
    if (userCanEditPermissions(userId)) {
        // add admin
    } else {
        return null;
    }
};

const removeAdmin = (userId, employeeId) => {
    if (userCanEditPermissions(userId)) {
        // remove admin
    } else {
        return null;
    }
};

const addHR = (userId, employeeId) => {
    if (userCanEditPermissions(userId)) {
        // remove admin
    } else {
        return null;
    }
};

const removeHR = (userId, employeeId) => {
    if (userCanEditPermissions(userId)) {
        // remove admin
    } else {
        return null;
    }
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

/**
 * Determines whether or not the given user can edit the given employee's informaton.
 */
const userCanEditInformation = (userId, employeeId) => {
    // if we're an admin, we should allow for editing information
    const adminRows = syncCon.query(IS_ADMIN_SQL, [userId]);
    if (adminRows.length) {
        return true;
    }

    // if the user manages the employee directly, we should allow for editing information
    const managingEmployeeRow = syncCon.query(EMPLOYEE_MANAGER_SQL, [employeeId, userId]);
    return managingEmployeeRow.length > 0;
};

/**
 * Returns whether or not the user can manage permissions. This includes creating/deleting admins, HR people, 
 * and employees. 
 */
const userCanEditPermissions = (userId) => {
    // if the user is an admin, return true
    const adminRows = syncCon.query(IS_ADMIN_SQL, [userId]);
    if (adminRows.length) {
        return true;
    }

    return false;
}

module.exports = {
    openConnection, closeConnection, authenticate, getEmployeeInfo, getSalaryHistory
};