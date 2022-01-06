import * as viewerModel from "./viewerModel.js";

/**
 *
 * @param {Context} ctx
 * @returns {Context.body}
 */
export async function add(ctx) {
  const vorname = ctx.body.vorname;
  const lastname = ctx.body.lastname;
  const mail = ctx.body.mail;
  const id = ctx.body.id;

  const user = { id, vorname, lastname, mail };
  const newUserID = await viewerModel.add(ctx.db2, user);
  const data = await viewerModel.getById(ctx.db2, newUserID);
  const accepts = ctx.accepts("html", "application/json");

  ctx.set("ADD_USER", "text/plain;charset=utf-8");
  if (accepts == "application/json") {
    ctx.status = 201;
    return (ctx.body = JSON.stringify(data, undefined, 2));
  } else {
    await ctx.redirect("/");
  }
  ctx.session.flash = "Du hast dich erfolgreich fuer den Rundgang angemeldet";
  await ctx.render("kontakt", { user: data });
}

export async function addViewerRender(ctx) {
  await ctx.render("kontakt", { form: ctx.body });
}

/**
 * shows Visitors
 * @param {Context} ctx
 *
 */
export async function showVisitorPage(ctx) {
  ctx.set("VISITOR", "text/plain;charset=utf-8");
  ctx.status = 200;
  const data = await viewerModel.all(ctx.db2);
  const accepts = ctx.accepts("html", "application/json");

  if (accepts == "application/json") {
    ctx.body = JSON.stringify(data, undefined, 2);
    return;
  } else {
    await ctx.render("kontakteAll", { visitors: data });
  }
}
