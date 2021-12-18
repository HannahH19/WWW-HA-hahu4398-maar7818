import webApp from "./src/app.js";
import * as sqlite from "sqlite";
import sqlite3 from "sqlite3";
const port = 3000;

(async () => {
  const db = await sqlite.open({
    filename: "./data/test.sqlite",
    driver: sqlite3.Database,
  });
  //  const data = await db.all("SELECT * FROM expo")
  //   const array = JSON.stringify(data, undefined, 2)
  //   console.log("db"+ '\n'+ array);
  const config = {
    db,
    port,
  };
  await webApp(config);
})();
