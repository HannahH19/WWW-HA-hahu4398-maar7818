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
  const data = await model.getById(ctx.db, ctx.params.ID);
  const accepts = ctx.accepts("html", "application/json");

  if (data != null) {
    if (accepts == "application/json") {
      ctx.body = JSON.stringif(data, undefined, 2);
      return;
    }
    await ctx.render("detailView", { exponat: data });
  } else {
    return (ctx.body = ctx.status = 404);
  }
}

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
  const image = ctx.body.image;

  const exponate = {
    id,
    title,
    description,
    teacher,
    students,
    course,
    semester,
    modul,
    image,
  };
  const newExponate = await model.add(ctx.db, exponate);
  const data = await model.getById(ctx.db, newExponate);
  const accepts = ctx.accepts("html", "application/json");

  if (accepts == "application/json") {
    ctx.status = 201;
    return (ctx.body = JSON.stringify(data, undefined, 2));
  } else {
    ctx.redirect("/");
  }
}

/**
 * delete an exponate from database
 * @param {Context} ctx
 * }
 */

export async function deleteById(ctx) {
  ctx.set("DELETE", "text/plain;charset=utf-8");
  const data = await model.getById(ctx.db, ctx.params.ID);
  ctx.status = 204;
  const accepts = ctx.accepts("html", "application/json");
  if (data != null) {
    if (accepts == "application/json") {
      return (ctx.body = JSON.stringify(
        await model.deleteById(ctx.db, ctx.params.ID)
      ));
    } else {
      await model.deleteById(ctx.db, ctx.params.ID);
      ctx.redirect("/");
    }
  } else {
    return (ctx.body = ctx.status = 404);
  }
}

/**
 * Render delete Form
 * @param {Context} ctx
 */
export async function deleteByIdRender(ctx) {
  ctx.set("DELETE_RENDER", "text/plain;charset=utf-8");
  const data = await model.getById(ctx.db, ctx.params.ID);
  await ctx.render("deleteExponat", { exponat: data });
}

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

/**
 * shows Hochschul Page
 * @param {Context} ctx
 *
 */
export async function showHochschulPage(ctx) {
  ctx.set("HOCHSCHULE", "text/plain;charset=utf-8");
  await ctx.render("hochschule");
}

/**
 * shows Kontakt Page
 * @param {Context} ctx
 *
 */
export async function showKontaktPage(ctx) {
  ctx.set("KONTAKT", "text/plain;charset=utf-8");
  await ctx.render("kontakt", { form: ctx.body });
}

/**
 * shows Dokumentation Page
 * @param {Context} ctx
 *
 */
export async function showDokumentation(ctx) {
  ctx.set("KONTAKT", "text/plain;charset=utf-8");
  await ctx.render("dokumentation");
}

/**
 * shows Timeline Page
 * @param {Context} ctx
 *
 */
export async function showTimeline(ctx) {
  ctx.set("KONTAKT", "text/plain;charset=utf-8");
  await ctx.render("timeline");
}
