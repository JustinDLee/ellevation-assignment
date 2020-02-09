const mysql = require('mysql');
const syncMysql = require('sync-mysql');
let con = null;
let syncCon = null;

const authenticationSql = 'SELECT id FROM employee WHERE username = ? && pw = ?';
const IS_ADMIN_SQL = 'SELECT id FROM `admin` WHERE id = ?';
const IS_HR_SQL = 'SELECT id FROM hr_employee WHERE id = ?';
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
 * Returns the information for the given employee id.
 */

 /**
  * Returns a json for all employees managed by the given employee.
  */

  /**
   * Returns a json for all employees except for other HR employees. 
   */

   /**
    * Returns all visible employee information given an employee id
    */

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

const getEmployeeInfo = (userId, employeeId) => {
    // determine whether we can view the user info or not first
    return new Promise((resolve, reject) => {
        userCanViewInformation(userId, employeeId).then(canView => {
            if (canView) {
                // query the database again for the information
                con.query(GET_EMPLOYEE_INFO_SQL, [employeeId], (err, results) => {
                    if (results) {
                        resolve(results);
                    } else {
                        reject('No rows found for employee id ' + employeeId);
                    }
                })
            } else {
                reject('User does not have access to this employee\'s information');
            }
        });
    })
};

// super slow, but can be made significantly faster by using indexing
const userCanViewInformation = (userId, employeeId) => {
    // query the database
    // if userId === employeeId, return true
    return new Promise((resolve) => {
         // if the employee is an admin, return true
         console.log('i am here!');
         console.log(syncCon.query(GET_EMPLOYEE_INFO_SQL, [userId]));

        if (userId === employeeId) {
            resolve(true);
        }
    
       

        
    
        // if the employee is an hr person and the other person isn't an hr person
        // con.query(IS_HR_SQL, [user_id], (err, results) => {
            
        // });
        // otherwise, return whether or not the user id manages this guy
    });
}
   module.exports = {
       openConnection, closeConnection, authenticate, getEmployeeInfo
   };