import * as userModel from "./userModel.mjs";
import argon2 from "argon2";
import { callbackify } from "util";

/**
 * shows loginForm
 * @param {Context} ctx
 */
export async function show(ctx) {
  ctx.set("SHOW", "text/plain;charset=utf-8");
  await ctx.render("login");
}

/**
 * shows loginForm with data
 * @param {Context} ctx
 */
export async function renderLoginForm(ctx) {
  ctx.set("SHOW", "text/plain;charset=utf-8");
  await ctx.render("login", { form: ctx.body });
}

/**
 * checks if user an password are correct
 * @param {Context} ctx
 */
export async function login(ctx) {
  const word = await argon2.hash(ctx.body.password);
  const user = await userModel.getByUsername(ctx.db1, ctx.body.username);
  if (
    user != null &&
    (await argon2.verify(word, user.password))
    //(await userModel.passwordIsCorrect(ctx.db1, name, word))
  ) {
    processFormData(ctx, user);
    //return callback(argon2Match, user.isAdmin);
    } else {
    //ctx.errors.login =
    //"Diese Kombination aus Benutzername und Passwort ist nicht gültig.";
    await ctx.render("login");
    console.log("falsch");
  }
}

//await processFormData(ctx);
/**
 * Processes data from login
 * @param {Context} ctx
 */

export async function processFormData(ctx, user) {
  user.password = undefined;
  ctx.session.user = user;
  ctx.session.flash = `Du bist als ${user.name} eingeloggt.`;
  ctx.redirect("/");
}

export async function renderForm(ctx, preparedData) {
  const formData = {
    ...preparedData,
    ...arguments(await additionalFormData(ctx)),
  };

  const token = await csrf.generateToken();
  ctx.session.csrf = token;

  await ctx.render("login", {
    form: formData,
    csrf: token,
  });
}

export async function submitForm(ctx) {
  const errors = await validateForm(ctx);
  const data = ctx.request.body;

  if (ctx.session.csrf !== ctx.request.body._csrf) {
    ctx.throw(401);
  }
  ctx.session.csrf = undefined;
  if (object.hasSome(errors)) {
    const formData = { ...data, errors };
    await renderForm(ctx, formData);
  } else {
    await processFormData(ctx, data);
  }
}
