const menu = document.querySelector(".header__nav-menu");
const orders = document.querySelector(".header__nav-order");
const admin = document.querySelector(".header__nav-admin");

const heroAdmin = document.querySelector(".hero__ad");
const heroMenu = document.querySelector(".hero__menu");
const heroOrders = document.querySelector(".hero__orders");

const photo = document.querySelector(".photo");
const name = document.querySelector(".name");
const price = document.querySelector(".price");
const create = document.querySelector(".create");
const menu1 = document.querySelector(".menu1");

saveData();

menu.addEventListener("click", () => {
  admin.style.color = "black";
  menu.style.color = "red";
  orders.style.color = "black";
  heroMenu.style.display = "block";
  heroOrders.style.display = "none";
  heroAdmin.style.display = "none";
});
orders.addEventListener("click", () => {
  menu.style.color = "black";
  orders.style.color = "red";
  admin.style.color = "black";
  heroMenu.style.display = "none";
  heroOrders.style.display = "block";
  heroAdmin.style.display = "none";
});

admin.addEventListener("click", () => {
  menu.style.color = "black";
  orders.style.color = "black";
  admin.style.color = "red";
  heroMenu.style.display = "none";
  heroOrders.style.display = "none";
  heroAdmin.style.display = "block";
});

create.addEventListener("click", () => {
  addData();
});

function addData() {
  let obj = {
    photo: photo.value,
    name: name.value,
    price: price.value,
    cont: 1,
    id: Date.now(),
  };

  let data = JSON.parse(localStorage.getItem("person")) || [];
  if (!name.value || !photo.value || !price.value) {
    alert("Element now");
    return;
  }
  data.push(obj);
  localStorage.setItem("person", JSON.stringify(data));
  photo.value = "";
  name.value = "";
  price.value = "";
  saveData();
}

function saveData() {
  menu1.innerHTML = "";
  let newData = JSON.parse(localStorage.getItem("person")) || [];
  newData.forEach((el, index) => {
    const saveDiv = document.createElement("div");
    const saveImg = document.createElement("img");
    const saveDivName = document.createElement("div");
    const saveName = document.createElement("h3");
    const saveEdit = document.createElement("button");
    const saveDivOrder = document.createElement("div");
    const savePrice = document.createElement("p");
    const saveOrder = document.createElement("button");

    saveDiv.classList = "saveDiv";
    saveDivName.classList = "saveDivName";
    saveEdit.classList = "btn Edit";
    saveOrder.classList = "btn Order";
    saveDivOrder.classList = "saveDivOrder";

    saveImg.src = el.photo;
    saveName.innerText = el.name;
    savePrice.innerHTML = `${el.price}$`;
    saveEdit.innerText = "Edit";
    saveOrder.innerText = "to order";

    saveDiv.append(saveImg);
    saveDivName.append(saveName);
    saveDivName.append(saveEdit);
    saveDiv.append(saveDivName);
    saveDivOrder.append(savePrice);
    saveDivOrder.append(saveOrder);
    saveDiv.append(saveDivOrder);

    menu1.append(saveDiv);

    saveEdit.addEventListener("click", () => {
      editData(index);
    });

    saveOrder.addEventListener("click", () => {
      orderData(el.id);
    });
  });
}
function orderData(id) {
  let data = JSON.parse(localStorage.getItem("person")) || [];
  let ord = JSON.parse(localStorage.getItem("order1")) || [];
  data = data.find((el) => el.id === id);
  ord.push(data);
  localStorage.setItem("order1", JSON.stringify("ord"));
}

function editData(index) {
  name.setAttribute("id", index);
  price.setAttribute("id", index);
  photo.setAttribute("id", index);

  let data = JSON.parse(localStorage.getItem("person")) || [];

  name.value = data[index].name;
  price.value = data[index].price;
  photo.value = data[index].photo;

  create.addEventListener("click", () => {
    EditBtnData();
  });
}

function EditBtnData() {
  let nameId = name.id;
  let priceId = price.id;
  let photoId = photo.id;

  let data = JSON.parse(localStorage.getItem("person")) || [];
  let newObj = {
    photo: photo.value,
    name: name.value,
    price: price.value,
  };

  data.splice(nameId, 1, newObj);
  data.splice(priceId, 1, newObj);
  data.splice(photoId, 1, newObj);
  localStorage.setItem("person", JSON.stringify(data));
  name.value = "";
  price.value = "";
  url.value = "";
  saveData();
}

function ordData() {
  adres2.innerHTML = "";
  let order = JSON.parse(localStorage.getItem("orders")) || [];
  order.forEach((el, index) => {
    let ordDiv = document.createElement("div");
    let ordImg = document.createElement("img");
    let ordNameDiv = document.createElement("div");
    let ordName = document.createElement("h2");
    let ordPriceDiv = document.createElement("div");
    let ordPrice = document.createElement("h2");
    let ordDel = document.createElement("button");
    let ordDiv01 = document.createElement("div");
    let plus = document.createElement("button");
    let minus = document.createElement("button");
    let plDiv = document.createElement("div");
    let cont = document.createElement("h2");

    ordDiv.classList.add("ordDiv");
    ordImg.classList.add("ordImg");
    ordNameDiv.classList.add("ordNameDiv");
    ordName.classList.add("ordName");
    ordPriceDiv.classList.add("ordPriceDiv");
    ordDel.classList.add("ordPay");
    ordDiv01.classList.add("ordDiv01");
    plus.classList.add("plus");
    minus.classList.add("minus");
    plDiv.classList.add("plDiv");

    ordImg.src = el.photo;
    ordName.innerText = el.name;
    ordPrice.innerText = `${el.price * el.cont}$`;
    ordDel.innerText = "DELETE";
    plus.innerText = "+";
    minus.innerText = "-";
    cont.innerText = el.cont;

    ordNameDiv.appendChild(ordName);
    ordNameDiv.appendChild(ordPrice);
    ordPriceDiv.append(ordDel);
    ordPriceDiv.append(plDiv);
    plDiv.append(minus);
    plDiv.append(cont);
    plDiv.append(plus);
    ordDiv01.append(ordImg);
    ordDiv01.append(ordNameDiv);
    ordDiv.append(ordDiv01);
    ordDiv.append(ordPriceDiv);

    heroOrders.append(ordDiv);

    ordDel.addEventListener("click", () => {
      ordDelData(index);
    });

    plus.addEventListener("click", () => {
      plusData(el.id);
    });

    minus.addEventListener("click", () => {
      minusData(el.id);
    });
  });
}

function plusData(id) {
  let order = JSON.parse(localStorage.getItem("orders")) || [];
  let foundItem = order.find((el) => el.id === id);
  foundItem.cont += 1;
  localStorage.setItem("orders", JSON.stringify(order));
  ordData();
}

function minusData(id) {
  let order = JSON.parse(localStorage.getItem("orders")) || [];
  let foundItem = order.find((el) => el.id === id);
  if (foundItem.cont > 1) {
    foundItem.cont -= 1;
  }
  localStorage.setItem("orders", JSON.stringify(order));
  ordData();
}

function ordDelData(index) {
  let ord = JSON.parse(localStorage.getItem("order1")) || [];
  ord.splice(index, 1);
  localStorage.setItem("order1", JSON.stringify("ord"));
  ordData();
}
