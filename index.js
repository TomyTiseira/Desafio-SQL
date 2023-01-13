const express = require("express");
const { createServer } = require("http");
const socketIo = require("socket.io");
const { engine } = require("express-handlebars");
const { createTable } = require("./model");
const {
  createProducts,
  readProducts,
  readMessages,
  createMessages,
} = require("./controller");

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

const executeOperationsDB = async () => {
  await createTable();
};

executeOperationsDB();

io.on("connection", async (client) => {
  products = (await readProducts()) || [];
  messages = (await readMessages()) || [];

  // Send all products from products array.
  client.emit("products", products);

  // Send all messages from messages array
  client.emit("messages", messages);

  // Receive a product.
  client.on("new-product", async (product) => {
    // await createTable();

    // Add product in DataBase.
    await createProducts(product);
    products = await readProducts();

    // Send the new product.
    io.sockets.emit("product-added", { ...product });
  });

  // Receive a message.
  client.on("new-message", async (message) => {
    const date = new Date().toLocaleString();

    // Add message in DataBase.
    await createMessages({ ...message, date });
    messages = await readMessages();

    // Send the new message.
    io.sockets.emit("message-added", { ...message, date });
  });
});

server.listen(8080);
