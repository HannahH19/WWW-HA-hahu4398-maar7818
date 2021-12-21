import Router from "@koa/router";
import koaBody from "koa-body";
import * as loginController from "./user/login-form-controller.mjs";
import * as controller from "./exponates/controller.js";
const router = new Router();
export default router;

router
  .get("/", (ctx) => {
    return (ctx.body = controller.index(ctx));
  })

  .get("/login", (ctx) => {
    return (ctx.body = loginController.show(ctx));
  })
  .post("/login", koaBody(), (ctx) => {
    router.use(koaBody());
    ctx.body = ctx.request.body;
    if(ctx.body.username != null && ctx.body.password != null){
      return (ctx.body = loginController.login(ctx));
    }else{
      ctx.status = 400;
      //hier noch Nachricht, die Nutzer bittet etwas einzugeben
      return (ctx.body = loginController.show(ctx));
    }
  })

  //.get('/logout', login.logout)

  .get("/hochschule", (ctx) => {
    return (ctx.body = controller.showHochschulPage(ctx));
  })

  .get("/kontakt", (ctx) => {
    return (ctx.body = controller.showKontaktPage(ctx));
  })

  .get("/exponat/:ID", (ctx) => {
    return (ctx.body = controller.show(ctx));
  });
