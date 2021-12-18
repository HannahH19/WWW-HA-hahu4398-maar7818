import Router from "@koa/router";
import * as controller from "./exponates/controller.js";
const router = new Router();
export default router;

router
.get("/", (ctx) =>{
    return (ctx.body = controller.index(ctx));
})

.get("/exponat/:ID", (ctx) => {
    return (ctx.body = controller.show(ctx));
  })
