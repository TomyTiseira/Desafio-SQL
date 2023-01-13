const { dbClientKnex, dbClientSqlite } = require("../config/connectToDb");
const { productsTable, messagesTable } = require("../config/constans");

const createTable = async () => {
  try {
    await dbClientKnex.schema.dropTableIfExists(productsTable);
    await dbClientKnex.schema.createTable(productsTable, (table) => {
      table.increments("id");
      table.string("name", 15).notNullable();
      table.float("price").notNullable();
      table.string("thumbnail", 40).notNullable();
    });

    await dbClientSqlite.schema.dropTableIfExists(messagesTable);
    await dbClientSqlite.schema.createTable(messagesTable, (table) => {
      table.increments("id");
      table.string("email", 50).notNullable();
      table.date("date").notNullable();
      table.string("message", 40).notNullable();
    });
  } catch (e) {
    console.log(e.message);
  } finally {
    dbClientKnex.destroy();
    dbClientSqlite.destroy();
  }
};

createTable();
