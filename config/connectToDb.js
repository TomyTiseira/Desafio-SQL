const knex = require("knex");

const dbClientKnex = knex({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    database: "ecommerce",
  },
});

const dbClientSqlite = knex({
  client: "sqlite3",
  connection: {
    filename: "./DB/ecommerce.sqlite",
  },
  useNullAsDefault: true,
});

module.exports = { dbClientKnex, dbClientSqlite };
