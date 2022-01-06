import Koa from "koa";
import http from "http";
import views from "koa-views";
import serve from "koa-static";
import mount from "koa-mount";
import exponateRouter from "./router.js";
import session from "koa-session";
import SQLite3Store from "koa-sqlite3-session";

/**
 * @param {Database} config
 */
export default async function webApp(config) {
  const app = new Koa();

  const templateDir = process.cwd() + "/views";
  const render = views(templateDir, {
    extension: "html",
    map: { html: "nunjucks" },
    options: {
      nunjucks: { loader: templateDir },
    },
  });
  app.use(render);
  app.use(flash);

  app.use(isAuthenticated);
  app.use(exponateRouter.routes());
  app.use(mount("/web", serve("./web")));
  app.use(mount("/fonts", serve("./fonts")));
  app.use(mount("/images", serve("./images")));
  app.use(session({ store: new SQLite3Store("./data/session.sqlite") }, app));
  app.keys = ["9)!G[V-.8HLCALY_WSX6!(y:)G04R"];
  app.context.params = {};
  app.context.session = {};
  app.context.db = config.db;
  app.context.db1 = config.db1;
  app.context.db2 = config.db2;
  return http.createServer(app.callback()).listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
  });
}

export const flash = async (ctx, next) => {
  if (ctx.session.flash) {
    ctx.state.flash = ctx.session.flash;
    ctx.session.flash = undefined;
  }
  await next();
};

export const isAuthenticated = async (ctx, next) => {
  if (ctx.session.user) {
    ctx.state.authenticated = true;
    ctx.state.canEdit = true;
  }
  await next();
};
