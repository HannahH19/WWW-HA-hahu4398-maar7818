import argon2 from "argon2";
import * as userModel from "./userModel.mjs "

export async function hashPassword(ctx){
    const word = await argon2.hash(ctx.body.password);
    //userModeladd(word);
}

export async function addUser(ctx){
    await ctx.render("addUserForm");
}

export async function addUserRender(ctx){
    await ctx.render("add", {form:ctx.body});
}