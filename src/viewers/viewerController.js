import * as viewerModel from "./viewerModel.mjs";
import argon2 from "argon2";

export async function add(ctx) {
    const name = ctx.body.name;
    const password = await argon2.hash(ctx.body.password);
    const id = ctx.body.id;
  
    const user = { id,name, password};
    const newUser = await userModel.add(ctx.db1, user);
    const data = await userModel.getById(ctx.db1, newUser);
    const accepts = ctx.accepts("html", "application/json");
  
    ctx.set("ADD_USER", "text/plain;charset=utf-8");
    if (accepts == "application/json") {
      ctx.status = 201;
      return ctx.body = JSON.stringify(data, undefined, 2);
    } else {
      //ctx.render("/");
    }
    await ctx.render("addUserForm", { user: data });
  }
  