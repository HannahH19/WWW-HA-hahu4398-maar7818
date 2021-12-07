import * as model from "./model.js";

//exponate controller

/**
 * shows all entries from database
 * @param {Context} ctx
 *
 * @returns {JSON}
 */
export async function index(ctx) {
  ctx.set("INDEX", "text/plain;charset=utf-8");
  ctx.status = 200;
  const data = await model.all(ctx.db);
  const accepts = ctx.accepts("html", "application/json");

  if (accepts == "application/json") {
    ctx.body = JSON.stringify(data, undefined, 2);
    return;
  } else {
    await ctx.render("index", { exponates: data });
  }
}

/**
 * shows exponate with index
 * @param {Context} ctx
 *
 * @returns {ctx.body}
 */
export async function show(ctx) {
  ctx.set("SHOW", "text/plain;charset=utf-8");
  ctx.status = 200;
  const data = await model.getById(ctx.db, dtx.params.ID);
  const accepts = ctx.accepts("html", "application/json");

  if (data != null) {
    if (accepts == "application/json") {
      ctx.body = JSON.stringif(data, undefined, 2);
      return;
    }
    await ctx.render("detailView", { bookmark: data });
  } else {
    return (ctx.body = ctx.status = 404);
  }
}

//add exponate
/**
 * add an exponate to database
 * @param {Context} ctx
 *
 *  * @returns {ctx.body}
 */

export async function add(ctx) {
  ctx.set("ADD", "text/plain;charset=utf-8");

  const title = ctx.body.title;
  const description = ctx.body.description;
  const teacher = ctx.body.teacher;
  const students = ctx.body.students;
  const course = ctx.body.course;
  const semester = ctx.body.semester;
  const modul = ctx.body.modul;
  const id = ctx.body.ID;

  const exponate = {
    id,
    title,
    description,
    teacher,
    students,
    course,
    semester,
    modul,
  };
  const newExponate = await model.add(ctx.db, exponate);
  const data = await model.getById(ctx.db, newExponate);
  const accepts = ctx.accepts("html", "application/json");

  if (accepts == "application/json") {
    ctx.status = 201;
    return (ctx.body = JSON.stringify(data, undefined, 2));
  } else {
    ctx.render("add");
  }
  await ctx.render("add", { exponate: data });
}

//delete exponate
/**
 * delete an exponate from database
 * @param {Context} ctx
 * }
 */

export async function deleteById(ctx) {
  ctx.set("DELETE", "text/plain;charset=utf-8");
  const data = await model.getById(ctx.db, ctx.params.ID);
  await ctx.render("delete", { exponate: data });
}

//edit exponate
/**
 * edit an exponate from database
 * @param {Context} ctx
 *
 */
export async function edit(ctx) {
  ctx.set("EDIT", "text/plain;charset=utf-8");
  const data = await model.getById(ctx.db, ctx.params.ID);
  await ctx.render("edit", { exponate: data });
}
