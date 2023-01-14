const express = require("express");
const { createServer } = require("http");
const socketIo = require("socket.io");
const { engine } = require("express-handlebars");
const { Container } = require("./controller");
const { dbClientKnex, dbClientSqlite } = require("./config/connectToDb");
const { productsTable, messagesTable } = require("./config/constans");

const app = express();
const server = createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Products array initialization.
let products = [];

// Messages array initialization.
let messages = [];

app.get("/", (req, res) => {
  res.render("products");
});

const productsContainer = new Container(dbClientKnex, productsTable);
const messagesContainer = new Container(dbClientSqlite, messagesTable);

io.on("connection", async (client) => {
  try {
    products = await productsContainer.readElements();
    messages = await messagesContainer.readElements();
  } catch (e) {
    console.log(e.message);
  }

  // Send all products from products array.
  client.emit("products", products);

  // Send all messages from messages array
  client.emit("messages", messages);

  // Receive a product.
  client.on("new-product", async (product) => {
    try {
      // Add product in DataBase.
      await productsContainer.createElement(product);
      products = await productsContainer.readElements();
    } catch (e) {
      console.log(e.message);
    }

    // Send the new product.
    io.sockets.emit("product-added", { ...product });
  });

  // Receive a message.
  client.on("new-message", async (message) => {
    const date = new Date().toLocaleString();

    try {
      // Add message in DataBase.
      await messagesContainer.createElement({ ...message, date });
      messages = await messagesContainer.readElements();
    } catch (e) {
      console.log(e.message);
    }

    // Send the new message.
    io.sockets.emit("message-added", { ...message, date });
  });
});

server.listen(8080);
