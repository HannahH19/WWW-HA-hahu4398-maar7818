import Router from "@koa/router";
import bodyParser from 'koa-body';
import * as loginController from './user/login-form-controller.mjs';
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

.get("/login", (ctx) =>{
    return (ctx.body = loginController.show(ctx));
})

.get("/hochschule", (ctx) =>{
    return (ctx.body = controller.showHochschulPage(ctx));
})

.get("/kontakt", (ctx) =>{
    return (ctx.body = controller.showKontaktPage(ctx));
})

// .post('/login', bodyParser(), login.submitForm);
// .get('/logout', login.logout);