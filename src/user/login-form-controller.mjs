import * as userModel from "./userModel.mjs";
import argon2 from "argon2";

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
  const word = ctx.body.password;
  var name = ctx.body.name;
  const user = await userModel.getByUsername(ctx.db1, name);
  ctx.state.user = user;
  if (user != null) {
    if (await argon2.verify(user.password, word)) {
      await processFormData(ctx, user);
      //return callback(argon2Match, user.isAdmin);
    }
  } else {
    await ctx.render("login", { form: ctx.body });
  }
}

/**
 * Processes data from login
 * @param {Context} ctx
 */

export async function processFormData(ctx, user) {
  user.password = undefined;
  //ctx.cookies.set('koa:sess', 'bsjhfa', {flash : true})
  ctx.session.flash = `Du bist als ${user.name} eingeloggt.`;
  ctx.state.canEdit = true;
  ctx.state.flash = ctx.session.flash;
  console.log(ctx.state.flash)
  //
  //ctx.cookies.set("koa:sess", "123", { loggedIn: true });
  //
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

/**
 * Logs user out 
 * @param {Context} ctx
 */
export async function logout(ctx) {
  ctx.session.user = undefined;
  ctx.session.flash = `Sie sind ausgeloggt.`;
  ctx.redirect('/');
}
