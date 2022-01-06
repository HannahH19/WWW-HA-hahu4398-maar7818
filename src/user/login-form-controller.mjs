import * as userModel from "./userModel.mjs";
import argon2 from "argon2";

/**
 * shows loginForm
 * @param {Context} ctx
 */
export async function show(ctx) {
  ctx.set("SHOW", "text/plain;charset=utf-8");
  await ctx.render("login", { form: ctx.body });
}

/**
 * checks if user an password are correct
 * @param {Context} ctx
 */
export async function login(ctx) {
  const word = ctx.body.password;
  var name = ctx.body.name;
  const user = await userModel.getByUsername(ctx.db1, name);

  if (user != null) {
    if (await argon2.verify(user.password, word)) {
      await processFormData(ctx, user);
      ctx.redirect("/");
    } else {
      ctx.state.flash = "Passwort oder Nutzer sind falsch.";
    }
  } else {
    ctx.state.flash = "Passwort oder Nutzer sind falsch.";
  }
  await ctx.render("login");
}

/**
 * Processes data from login
 * @param {Context} ctx
 */

export async function processFormData(ctx, user) {
  user.password = undefined;
  ctx.session.flash = `Sie sind als ${user.name} eingeloggt.`;
  ctx.session.user = user;
  ctx.state.user = ctx.session.user;
  ctx.state.canEdit = true;
}

/**
 * Logs user out
 * @param {Context} ctx
 */
export async function logout(ctx) {
  ctx.session.user = undefined;
  ctx.session.flash = `Sie sind ausgeloggt.`;
  ctx.redirect("/");
}
