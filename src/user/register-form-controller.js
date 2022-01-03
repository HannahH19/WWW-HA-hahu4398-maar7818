import argon2 from "argon2";
import * as userModel from "./userModel.mjs ";

export async function addUserRender(ctx) {
  await ctx.render("addUserForm", { form: ctx.body });
}

// export async function processFormData(ctx, data) {
//   if (ctx.params.id) {
//     await userModel.update(ctx.db, ctx.params.id, data);
//     ctx.redirect("/");
//   } else {
//     const id = await userModel.add(ctx.db, data);
//     ctx.redirect("/");
//   }
// }

