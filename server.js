
import webApp from './src/app.js';
import * as sqlite from "sqlite";
import sqlite3 from "sqlite3";
const port = 3000;

(async () => {
	const db1 = await sqlite.open({
		filename: "./data/exponates.sqlite",
		driver: sqlite3.Database,
	});
	const config = { db1,port };
	await webApp(config);
})();
