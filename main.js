let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("create");

let mood = "create";
let searchMood = "title";
let tmp;
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - discount.value;
    total.innerHTML = ` ${result}`;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = "Total:";
    total.style.backgroundColor = "red";
  }
}
let dataPro;
//crate
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}
showdata();

function showdata() {
  let table = "";
  getTotal();

  for (let index = 0; index < dataPro.length; index++) {
    table += ` <tr>
                <td>${index + 1}</td>
                 <td>${dataPro[index].title}</td>
                 <td>${dataPro[index].price}</td>
                 <td>${dataPro[index].taxes}</td>
                 <td>${dataPro[index].ads}</td>
                 <td>${dataPro[index].discount}</td>
                 <td>${dataPro[index].category}</td>
                 <td><button id="update" onclick = "updateData(${index})">update</button></td>
                 <td><button onclick ="deleteItem(${index})" id="delete">delete</button></td>
                 
            </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;

  let btnDelete = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = ` <button onclick ="deleteAlll()">Delete All(${dataPro.length})</button>
`;
  } else {
    btnDelete.innerHTML = "";
  }
}

submit.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: Number(total.innerText),
    count: count.value,
    category: category.value,
  };
  if (
    title.value !== "" &&
    price.value !== "" &&
    category.value !== "" &&
    Number(count.value) < 10
  ) {
    if (mood === "create") {
      if (newPro.count <= 1) dataPro.push(newPro);
      else {
        for (let index = 0; index < newPro.count; index++) {
          dataPro.push(newPro);
        }
      }
    } else {
      dataPro[tmp] = newPro;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
      clearData();
    }
  }

  localStorage.setItem("product", JSON.stringify(dataPro));

  showdata();
};

//clear
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
//read

// delete item

function deleteItem(index) {
  dataPro.splice(index, 1);
  localStorage.product = JSON.stringify(dataPro);

  showdata();
}

// delete all

function deleteAlll() {
  localStorage.clear();
  dataPro.splice(0);
  showdata();
}

function updateData(index) {
  title.value = dataPro[index].title;
  price.value = dataPro[index].price;
  taxes.value = dataPro[index].taxes;
  ads.value = dataPro[index].ads;
  discount.value = dataPro[index].discount;
  total.innerHTML = dataPro[index].total;
  getTotal();
  count.style.display = "none";
  category.value = dataPro[index].category;
  submit.innerHTML = "Update";
  mood = "update";
  tmp = index;
  console.log(tmp);
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//search

function getSearchMood(id) {
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  document.getElementById("search").placeholder = "Search By " + searchMood;
  document.getElementById("search").value = "";
  showdata();
}

function searchData(value) {
  let table = "";
  for (let index = 0; index < dataPro.length; index++) {
    if (searchMood === "title") {
      if (dataPro[index].title.toLowerCase().includes(value.toLowerCase())) {
        table += ` <tr>
                <td>${index + 1}</td>
                    <td>${dataPro[index].title}</td>
                    <td>${dataPro[index].price}</td>
                    <td>${dataPro[index].taxes}</td>
                    <td>${dataPro[index].ads}</td>
                    <td>${dataPro[index].discount}</td>
                    <td>${dataPro[index].category}</td>
                    <td><button id="update" onclick = "updateData(${index})">update</button></td>
                    <td><button onclick ="deleteItem(${index})" id="delete">delete</button></td>
                </tr>`;
      }
    } else {
      if (dataPro[index].category.toLowerCase().includes(value.toLowerCase())) {
        table += ` <tr>
                <td>${index + 1}</td>
                 <td>${dataPro[index].title}</td>
                 <td>${dataPro[index].price}</td>
                 <td>${dataPro[index].taxes}</td>
                 <td>${dataPro[index].ads}</td>
                 <td>${dataPro[index].discount}</td>
                 <td>${dataPro[index].category}</td>
                 <td><button id="update" onclick = "updateData(${index})">update</button></td>
                 <td><button onclick ="deleteItem(${index})" id="delete">delete</button></td>
                 
            </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
