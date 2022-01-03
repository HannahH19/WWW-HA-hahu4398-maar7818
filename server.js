import webApp from "./src/app.js";
import * as sqlite from "sqlite";
import sqlite3 from "sqlite3";
const port = 3000;

(async () => {
  const db = await sqlite.open({
    filename: "./data/test.sqlite",
    driver: sqlite3.Database,
  });
  const db1 = await sqlite.open({
    filename: "./data/user.sqlite",
    driver: sqlite3.Database,
  });
 
  const config = {
    db,
    db1,
    port,
  };
  await webApp(config);
})();

