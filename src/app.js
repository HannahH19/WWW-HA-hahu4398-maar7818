import Koa from "koa";
import http from "http";
import views from "koa-views";
import serve from "koa-static";
import mount from "koa-mount";
import exponateRouter from "./router.js";


/**
 * @param {Database} config
 */
export default async function webApp(config) {
  const app = new Koa();
  app.use(exponateRouter.routes());

  app.use(mount("/web",serve("./web")));
  app.use(mount("/fonts",serve("./fonts")));
  app.use(mount("/images",serve("./images")));
  app.context.params = {};
  app.context.db = config.db;
  app.context.db1 = config.db1;
  const templateDir = process.cwd() + "/views";
  const render = views(templateDir, {
    extension: "html",
    map: { html: "nunjucks" },
    options: {
      nunjucks: { loader: templateDir },
    },
  });

  app.context.render = render();

  return http.createServer(app.callback()).listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
  });
}
