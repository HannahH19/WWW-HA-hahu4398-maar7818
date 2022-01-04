import { Database } from "sqlite";

/**
 * Adds new user
 * @param {User} visitor
 * @param {Database} db
 * @returns {Integer}
 */
export async function add(db, visitor) {
  const sql = `INSERT INTO visitors (id, vorname, lastname, mail) VALUES ($id, $vorname, $lastname, $mail)`;
  const result = await db.run(sql, {
    $id: visitor.id,
    $vorname: visitor.vorname,
    $lastname: visitor.lastname,
    $mail: visitor.mail
  });
  return result.lastID;
}

/**
 * Returns user, with matching ID
 * @param {Database} db
 * @param {Integer} id
 * @returns {user}
 */
export async function getById(db, id) {
  const sql = `SELECT * FROM visitors WHERE id = $id`;
  const viwer = await db.get(sql, { $id: id });
  return viwer;
}

/**
 * Returns user, with matching
 * @param {Database} db
 * @param {String} name
 */
 export async function getByUsername(db, name) {
  const sql = `SELECT * FROM visitors WHERE name = $lastname`;
  const user = await db.get(sql, { $lastname: name });
  return user;
}