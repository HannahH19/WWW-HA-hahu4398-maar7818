
import { Database } from "sqlite";

/**
 * Returns user, with matching
 * @param {Database} db
 * @param {String} username
 */
export async function getByUsername(db, name) {
  const sql = `SELECT * FROM user WHERE name = $name`;
  const user = await db.get(sql, { $name: name });
  return user;
}

/**
 * Returns user, with matching ID
 * @param {Database} db
 * @param {Integer} id
 * @returns {user}
 */
export async function getById(db, id) {
  const sql = `SELECT * FROM user WHERE id = $id`;
  const user = await db.get(sql, { $id: id });
  return user;
}

/**
 * Adds new user
 * @param {User} user
 * @param {Database} db
 * @returns {Integer}
 */
export async function add(db, user) {
  const sql = `INSERT INTO user (id, name, password) VALUES ( $id, $name, $password)`;
  const result = await db.run(sql, {
    $id: user.id,
    $name: user.name,
    $password: user.password,
  });
  return result.lastID;
}
