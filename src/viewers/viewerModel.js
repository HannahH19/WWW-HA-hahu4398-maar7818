
import { Database } from "sqlite";

/**
 * Adds new user
 * @param {User} user
 * @param {Database} db
 * @returns {Integer}
 */
export async function add(db, visitor) {
  const sql = `INSERT INTO visitor (vorname, lastname, mail) VALUES ( $vorname, $lastname, $mail)`;
  const result = await db.run(sql, {
    $vorname: visitor.vorname,
    $lastname: visitor.lastname,
    $mail: visitor.mail
  });
  return result.lastID;
}