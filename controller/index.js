const { dbClientKnex, dbClientSqlite } = require("../config/connectToDb");

const createProducts = async (productsToAdd) => {
  try {
    await dbClientKnex("products").insert(productsToAdd);
  } catch (e) {
    console.log(e.message);
  }
};

const readProducts = async () => {
  try {
    const productsInDb = await dbClientKnex.from("products").select("*");
    return productsInDb;
  } catch (e) {
    console.log(e.message);
  }
};

const createMessages = async (messagesToAdd) => {
  try {
    await dbClientSqlite("messages").insert(messagesToAdd);
  } catch (e) {
    console.log(e.message);
  }
};

const readMessages = async () => {
  try {
    const messagesInDb = await dbClientSqlite.from("messages").select("*");
    return messagesInDb;
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = { createProducts, readProducts, createMessages, readMessages };
