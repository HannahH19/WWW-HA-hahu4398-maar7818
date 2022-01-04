import * as viewerModel from "./viewerModel.js";

export async function add(ctx) {
    const name = ctx.body.vorname;
    const lastname = ctx.body.lastname;
    const mail = ctx.body.mail;
    const id = ctx.body.id;
  
    const user = { id,name, lastname, mail};
    const newUser = await viewerModel.add(ctx.db, user);
    const data = await viewerModel.getById(ctx.db, newUser);
    const accepts = ctx.accepts("html", "application/json");
  
    ctx.set("ADD_USER", "text/plain;charset=utf-8");
    if (accepts == "application/json") {
      ctx.status = 201;
      return ctx.body = JSON.stringify(data, undefined, 2);
    } else {
      await ctx.render("/");
    }
    await ctx.render("kontakt", { user: data });
  }

  export async function addViewerRender(ctx) {
    await ctx.render("kontakt", { form: ctx.body });
  }
  