import { Database } from "sqlite";

/**
 * Returns user, with matching 
 * @param {Database} db
 * @param {String} username
 * @returns {user}
 */
 export async function getByUsername(db, name) {
    const sql = `SELECT * FROM user WHERE name = $name`;
    const user = await db.get(sql, { $name: name });
    return user;
  }

/**
 * Checks if passwords are matching
 * @param {User} user
 * @param {Database} db
 * @param {String} password
 * @returns {Boolean}
 */
  export async function passwordIsCorrect(db, name, password){
    const sql =`SELECT password FROM user WHERE name = $name`
    const passwordUser  = await db.get(sql, { $name: name});

    if(password === passwordUser.password){
      return true
    }else{
      return false
    }
  }