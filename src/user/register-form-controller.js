export async function addUserRender(ctx) {
  await ctx.render("addUserForm", { form: ctx.body });
}
