import Koa from "koa";
import http from "http";
import views from "koa-views";
import serve from "koa-static";
import exponateRouter from "./router.js";

/**
 * @param {Database} config
 */
export default async function webApp(config) {
  const app = new Koa();

  app.use(exponateRouter.routes());
  app.use(serve(process.cwd() + "/web"));
  app.context.params = {};
  app.context.db = config.db;
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
