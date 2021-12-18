import * as userModel from "./userModel.mjs";

// const user = await userModel.getByUsername(ctx.container.db, form.username);
// if ((await userModel.passwordIsCorrect(user, form.password)) === true) {
// await processFormData(ctx, user);
// } else {
// formData.errors.login = 'Diese Kombination aus Benutzername und Passwort ist nicht gültig.';
//await renderForm(ctx, formData);
//}

/**
 * shows loginForm
 * @param {Context} ctx
 */
export async function show(ctx) {
  ctx.set("SHOW", "text/plain;charset=utf-8");
  await ctx.render("login");
}
