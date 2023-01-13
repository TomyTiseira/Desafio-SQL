const { dbClientKnex, dbClientSqlite } = require("../config/connectToDb");

class Container {
  constructor(dbClient, table) {
    this.dbClient = dbClient;
    this.table = table;
  }

  createElement = async (elementToAdd) => {
    await this.dbClient(this.table).insert(elementToAdd);
  };

  readElements = async () => {
    const elementsInDb = (await this.dbClient(this.table).select("*")) || [];
    return elementsInDb;
  };
}
// const createProducts = async (productsToAdd) => {
//   try {
//     await dbClientKnex("products").insert(productsToAdd);
//   } catch (e) {
//     console.log(e.message);
//   }
// };

// const readProducts = async () => {
//   try {
//     const productsInDb =
//       (await dbClientKnex.from("products").select("*")) || [];
//     return productsInDb;
//   } catch (e) {
//     console.log(e.message);
//     throw Error(e);
//   }
// };

// const createMessages = async (messagesToAdd) => {
//   try {
//     await dbClientSqlite("messages").insert(messagesToAdd);
//   } catch (e) {
//     console.log(e.message);
//   }
// };

// const readMessages = async () => {
//   try {
//     const messagesInDb =
//       (await dbClientSqlite.from("messages").select("*")) || [];
//     return messagesInDb;
//   } catch (e) {
//     console.log(e.message);
//   }
// };

// module.exports = { createProducts, readProducts, createMessages, readMessages };

module.exports = { Container };
