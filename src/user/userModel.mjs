import { Database } from "sqlite";

/**
 * Returns user, with matching 
 * @param {Database} db
 * @param {String} username
 * @returns {user}
 */
 export async function getByUsername(db, username) {
    const sql = `SELECT * FROM user WHERE username = $username`;
    const user = await db.get(sql, { $username: username });
    return user;
  }

/**
 * Returns user, with matching 
 * @param {String} username
 * @param {String} password
 * @returns {Boolean}
 */
  export async function passwordIsCorrect(user, password){
    const sql = `SELECT * FROM user WHERE username = $username`;
  }