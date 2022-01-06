import * as viewerModel from "./viewerModel.js";

export async function checkin(ctx) {
  var name = ctx.body.lastname;
  const user = await viewerModel.getByUsername(ctx.db2, name);

  if (user != null) {
    await processFormData(ctx, user);
    ctx.redirect("/");
  } else {
    ctx.state.flash = "Bitte hinterlege deinen Namen";
  }
  await ctx.render("/");
}

/**
 * Processes data from login
 * @param {Context} ctx
 */
export async function processFormData(ctx, user) {
  ctx.session.flash = `Du bist als ${user.name} eingeloggt.`;
  ctx.session.user = user;
  ctx.state.user = ctx.session.user;
  ctx.state.canEdit = false;
}
