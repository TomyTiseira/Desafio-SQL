const socket = io();
let flag = false;

socket.on("products", (data) => {
  if (data.length !== 0) {
    const productList = document.getElementById("productList");
    const notProducts = document.getElementById("notProducts");
    productList.classList.remove("d-none");
    notProducts.classList.add("d-none");
    flag = true;
  }
  let html = "";
  data.forEach((product) => {
    html += `
    <tr>
      <th scope="row">${product.id}</th>
      <td>${product.name}</td>
      <td>$${product.price}</td>
      <td><img src=${product.thumbnail} alt=${product.name}} style="height: 50px; width: 50px;"></td>
    </tr>
    `;
  });
  document.getElementById("productTable").innerHTML = html;
});

socket.on("product-added", (product) => {
  if (!flag && product.id) {
    const productList = document.getElementById("productList");
    const notProducts = document.getElementById("notProducts");
    productList.classList.remove("d-none");
    notProducts.classList.add("d-none");
    flag = true;
  }

  let html = document.getElementById("productTable").innerHTML;
  html += `
  <tr>
    <th scope="row">${1}</th>
    <td>${product.name}</td>
    <td>$${product.price}</td>
    <td><img src=${product.thumbnail} alt=${
    product.name
  }} style="height: 50px; width: 50px;"></td>
  </tr>
  `;

  document.getElementById("productTable").innerHTML = html;
});

const sendProduct = (that) => {
  const product = {
    name: that.name.value,
    price: that.price.value,
    thumbnail: that.thumbnail.value,
  };

  socket.emit("new-product", product);
};

socket.on("messages", (data) => {
  let html = "";
  data.forEach((message) => {
    html += `
    <p>
      <b style="color: blue">${message.email}</b>
      <span style="color: brown">[ ${message.date} ]</span> 
      : 
      <i style="color: green">${message.message}</i>
    </p>
    `;
  });

  document.getElementById("messages").innerHTML = html;
});

socket.on("message-added", (message) => {
  let html = document.getElementById("messages").innerHTML;
  html += `
  <p>
    <b style="color: blue">${message.email}</b>
    <span style="color: brown">[ ${message.date} ]</span> 
    : 
    <i style="color: green">${message.message}</i>
  </p>
  `;

  document.getElementById("messages").innerHTML = html;
});

const sendMessage = (that) => {
  const message = {
    email: that.email.value,
    message: that.message.value,
  };

  socket.emit("new-message", message);
};
