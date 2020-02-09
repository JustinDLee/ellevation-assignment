const mysql = require('mysql');
let con = null;

const authenticationSql = 'SELECT id FROM employee WHERE username = ? && pw = ?';
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
        password: password
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
            console.log(results);
            resolve(0);
        });
    });
    
}
   module.exports = {
       openConnection, closeConnection, authenticate
   };