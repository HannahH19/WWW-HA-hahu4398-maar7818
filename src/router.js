import Router from "@koa/router";
import koaBody from "koa-body";
import * as loginController from "./user/login-form-controller.mjs";
import * as controller from "./exponates/controller.js";
import * as formController from "./exponates/form-controller.js";
import * as registerController from "./user/register-form-controller.js";
import * as userController from "./user/userController.js";
import isAuthenticated from "./app.js";
//import isLogged from "./app.js";
const router = new Router();
export default router;

router
  .get("/", ctx => {
    return (ctx.body = controller.index(ctx));
  })

  .get("/exponat/add",  (ctx) => {
    return (ctx.body = formController.addRender(ctx));
  })

  .post("/exponat/add", koaBody(), (ctx) => {
    router.use(koaBody());
    ctx.body = ctx.request.body;
    if (ctx.body.title != "" && ctx.body.description != "") {
      
      return (ctx.body = controller.add(ctx));
    } else {
      //ctx.redirect("/");
      ctx.status = 400;
      return (ctx.body = formController.addRender(ctx));
    }
  })

  .get("/exponat/:ID", (ctx) => {
    return (ctx.body = controller.show(ctx));
  })

  .get("/exponat/:ID/edit", (ctx) => {
    return (ctx.body = formController.editRender(ctx));
  })

  .post("/exponat/:ID/edit",koaBody(), (ctx) => {
    router.use(koaBody());
    ctx.body = ctx.request.body;
    console.log(ctx.body)
    if (ctx.body.title != "" ) {
      return formController.edit(ctx);
    }else{
      ctx.status = 400;
      ctx.redirect("/");
      console.log("Titel darf nicht leer sein")
    }
  })

  .get("/exponat/:ID/delete", (ctx) => {
    return (ctx.body = controller.deleteByIdRender(ctx));
  })

  .post("/exponat/:ID/delete", (ctx) => {
    return (ctx.body = controller.deleteById(ctx));
  })

  .get("/login", (ctx) => {
    return (ctx.body = loginController.show(ctx));
  })

  .post("/login", koaBody(), (ctx) => {
    router.use(koaBody());
    ctx.body = ctx.request.body;
  
    if(ctx.body.name != "" && ctx.body.password != ""){
      return  loginController.login(ctx);
    }else{
      ctx.status = 400;
      //hier noch Nachricht, die Nutzer bittet etwas einzugeben
      return (ctx.body = loginController.show(ctx));
    }
  })

  .get("/register", (ctx) => {
    return (ctx.body = registerController.addUserRender(ctx));
  })

  .post("/register", koaBody(), (ctx) => {
    router.use(koaBody());
    ctx.body = ctx.request.body;
    if(ctx.body.name != "" && ctx.body.password != ""){
      return (ctx.body = userController.add(ctx));
    }else{
      ctx.status = 400;
      return (ctx.body = registerController.addUserRender(ctx));
    }
  })

  .get('/logout', (ctx) => {
    return (ctx.body = loginController.logout(ctx));
  })

  .get("/hochschule", (ctx) => {
    return (ctx.body = controller.showHochschulPage(ctx));
  })

  .get("/kontakt", (ctx) => {
    return (ctx.body = controller.showKontaktPage(ctx));
  })

 
