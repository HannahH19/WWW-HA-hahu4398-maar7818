import { Database } from "sqlite";

/**
 * Returns all exponates as Array
 * @param {Database} db
 * @returns {Array}
 */
export async function all(db) {
  const sql = `SELECT * FROM expo`;
  const array = await db.all(sql);
  return array;
}

/**
 * Returns exponate, with matching ID
 * @param {Database} db
 * @param {Int} id
 * @returns {Exponate}
 */
export async function getById(db, id) {
  const sql = `SELECT * FROM expo WHERE id = $id`;
  const exponate = await db.get(sql, { $id: id });
  return exponate;
}

/**
 * Adds element to database
 * @param {Database} db
 * @param {Exponate} exponate
 * @returns {Int}
 */
export async function add(db, exponate) {
  const sql = `INSERT INTO expo (id, title, description, teacher, students, course, semester, image) 
    VALUES ($id, $title, $description, $teacher, $students, $course, $semester,$image)`;
  const result = await db.run(sql, {
    $id: exponate.id,
    $title: exponate.title,
    $description: exponate.description,
    $teacher: exponate.teacher,
    $students: exponate.students,
    $course: exponate.course,
    $semester: exponate.semester,
    $image: exponate.image,
  });
  return result.lastID;
}

/**
 * deletes exponate with matching id from database
 * @param {Database} db
 * @param {Int} id
 * @returns {result}
 */
export async function deleteById(db, id) {
  const sql = `DELETE FROM expo WHERE id =$id`;
  const result = await db.run(sql, { $id: id });
  return result.changes;
}

/**
 * updates bookmark with matching id from database
 * @param {Database} db
 * @param {Int} id
 * @param {exponate} exponate
 * @returns {result}
 */
export async function update(db, id, exponate) {
  const sql = `UPDATE expo SET title=$title, description=$description, teacher=$teacher, students=$students, course=$course, semester=$semester, image=$image WHERE id=$id`;
  const result = await db.run(sql, {
    $id: id,
    $title: exponate.title,
    $course: exponate.course,
    $description: exponate.description,
    $semester: exponate.semester,
    $teacher: exponate.teacher,
    $students: exponate.students,
    $image: exponate.image,
  });
  return result;
}
