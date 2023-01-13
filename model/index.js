const { dbClientKnex, dbClientSqlite } = require("../config/connectToDb");

const createTable = async () => {
  try {
    await dbClientKnex.schema.dropTableIfExists("products");
    await dbClientKnex.schema.createTable("products", (table) => {
      table.increments("id");
      table.string("name", 15).notNullable();
      table.float("price").notNullable();
      table.string("thumbnail", 40).notNullable();
    });

    await dbClientSqlite.schema.dropTableIfExists("messages");
    await dbClientSqlite.schema.createTable("messages", (table) => {
      table.increments("id");
      table.string("email", 50).notNullable();
      table.date("date").notNullable();
      table.string("message", 40).notNullable();
    });
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = { createTable };
