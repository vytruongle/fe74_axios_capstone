var callApi = new CallApi();
var productList = new ProductList();

function getEle(id) {
  return document.getElementById(id);
}

function getListProduct() {
  callApi
    .fetchListData()
    .then(function (result) {
      renderProduct(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getListProduct();

function renderProduct(data) {
  var content = "";
  data.forEach((product) => {
    var icon = "";
    if (product.type.toLowerCase() === "iphone") {
      icon = `<i class="fa-brands fa-apple" style="font-size: 20px"></i>`;
    }
    if (product.type.toLowerCase() === "samsung") {
      icon = `<iconify-icon icon="logos:samsung"></iconify-icon>`;
    }
    content += `
            <div class="col-lg-3 col-md-4 col-12" style="margin-top: 100px">
                <div class="card">
                    <div
                        class="card-header d-flex justify-content-between align-items-center"
                    >
                        <div class="card-header_icon">
                        
                        ${icon}
                        </div>
                        <span class="card-header_text">In Stock</span>
                    </div>
                    <img
                        class="card-img-top"
                        src="${product.img}"
                        alt=""
                    />
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                        <h4 class="card-title">${product.name}</h4>
                        <div class="heart-icon">
                            <div id="before-push-${product.id}" onclick="fillHeart(${product.id})">
                              <i class="fa-regular fa-heart" ></i>
                            </div>
                            <div id="after-push-${product.id}" class="disable" onclick="emptyHeart(${product.id})">
                              <i class="fa-solid fa-heart"></i>
                            </div>
                        </div>
                        </div>
                        <div>
                        <p class="card-text">${product.desc}</p>
                        <div
                            class="d-flex justify-content-between align-items-center mt-4"
                        >
                            <span class="price">${product.price}</span>
                            <button
                            id="add-product-${product.id}"
                            class="btn btn-outline-success"
                            data-toggle="modal"
                            data-target="#myModal"
                            onclick="addProduct(${product.id})"
                            >
                            Add<i class="fa-solid fa-angle-right"></i>
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  });
  getEle("list-product").innerHTML = content;
}
//open cart list
getEle("cart-icon").addEventListener("click", function () {
  document.getElementsByClassName("overflow")[0].style =
    "display:block; transition: all 0.3s;";
  document.getElementsByClassName("cart-list__bottom")[0].style.display =
    "block";
  //check class exist
  if (
    getEle("cart-list").classList.contains(
      "animate__animated",
      "animate__fadeInLeft"
    )
  ) {
    getEle("cart-list").classList.remove(
      "animate__animated",
      "animate__fadeInLeft"
    );
  }
  getEle("cart-list").classList.add(
    "animate__animated",
    "animate__fadeInRight"
  );
  getEle("cart-list").style = "right:0;";
});
//close cart list
getEle("xmark-icon").addEventListener("click", function () {
  getEle("cart-list").classList.remove(
    "animate__animated",
    "animate__fadeInRight"
  );
  getEle("cart-list").style = "right:-70%; transition: all 0.6s;";
  document.getElementsByClassName("overflow")[0].style =
    "display:none; transition: all 0.3s;";
  document.getElementsByClassName("cart-list__bottom")[0].style.display =
    "none";
});
//select type of product
/**
 * Apple
 */
getEle("apple").addEventListener("click", function () {
  getEle("apple").classList.remove("btn-light");
  getEle("apple").classList.add("btn-success");
  //check button all
  if (getEle("all-product").classList.contains("btn-success")) {
    getEle("all-product").classList.remove("btn-success");
    getEle("all-product").classList.add("btn-light");
  }
  //check button samsung
  if (getEle("samsung").classList.contains("btn-success")) {
    getEle("samsung").classList.remove("btn-success");
    getEle("samsung").classList.add("btn-light");
  }
  callApi
    .fetchListData()
    .then(function (result) {
      productList.removeAllProduct();
      result.data.forEach((product) => {
        if (product.type.toLowerCase() === "iphone") {
          productList.addProduct(product);
        }
      });
      renderProduct(productList.arr);
    })
    .catch(function (error) {
      console.log(error);
    });
});

/**
 * Samsung
 */
getEle("samsung").addEventListener("click", function () {
  getEle("samsung").classList.remove("btn-light");
  getEle("samsung").classList.add("btn-success");
  //check button all
  if (getEle("all-product").classList.contains("btn-success")) {
    getEle("all-product").classList.remove("btn-success");
    getEle("all-product").classList.add("btn-light");
  }
  //check button samsung
  if (getEle("apple").classList.contains("btn-success")) {
    getEle("apple").classList.remove("btn-success");
    getEle("apple").classList.add("btn-light");
  }
  callApi
    .fetchListData()
    .then(function (result) {
      productList.removeAllProduct();
      result.data.forEach((product) => {
        if (product.type.toLowerCase() === "samsung") {
          productList.addProduct(product);
        }
      });
      renderProduct(productList.arr);
    })
    .catch(function (error) {
      console.log(error);
    });
});

/**
 * All product
 */
getEle("all-product").addEventListener("click", function () {
  getEle("all-product").classList.remove("btn-light");
  getEle("all-product").classList.add("btn-success");
  //check button all
  if (getEle("samsung").classList.contains("btn-success")) {
    getEle("samsung").classList.remove("btn-success");
    getEle("samsung").classList.add("btn-light");
  }
  //check button samsung
  if (getEle("apple").classList.contains("btn-success")) {
    getEle("apple").classList.remove("btn-success");
    getEle("apple").classList.add("btn-light");
  }
  callApi
    .fetchListData()
    .then(function (result) {
      renderProduct(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

/**
 * Fill and empty heart
 */

function fillHeart(id) {
  getEle(`before-push-${id}`).classList.add("disable");
  getEle(`after-push-${id}`).classList.remove("disable");
}

function emptyHeart(id) {
  getEle(`after-push-${id}`).classList.add("disable");
  getEle(`before-push-${id}`).classList.remove("disable");
}

/**
 * Add product to cart list
 */

function addProduct(id) {
  callApi
    .getListData(id)
    .then(function (result) {
      getEle("name-product").value = result.data.name;
      getEle("type-product").value = result.data.type;
      getEle(
        "image-product"
      ).innerHTML = `<img src="${result.data.img}" class="img-fluid w-50" />`;
      getEle("screen-product").value = result.data.screen;
      getEle("backCamera-product").value = result.data.backCamera;
      getEle("frontCamera-product").value = result.data.frontCamera;
      getEle("price-product").value = result.data.price + "$";
      renderQuantity(result.data.id);
      getEle("addToCart").addEventListener("click", function () {
        var quantity = getEle(`quantity-product-${result.data.id}`).value;
        var sp = new Product(
          result.data.id,
          result.data.name,
          result.data.price,
          result.data.screen,
          result.data.blackCamera,
          result.data.frontCamera,
          result.data.img,
          result.data.desc,
          result.data.type,
          quantity
        );
        productList.addCartList(sp);
        renderCartList(productList.arrCart);
        renderSum(productList.arrCart);
        // close modal
        getEle("btnDong").click();
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  // productList.removeProduct()
  // productList.addProduct(sp)
}

function renderQuantity(i) {
  var content = "";
  content = `
          <label class="mr-3">Số lượng</label>
          <div
            class="value-button"
            id="decrease-${i}"
            onclick="decreaseValue(${i})"
            value="Decrease Value"
          >
            -
          </div>
          <input type="number" id="quantity-product-${i}" value="1" 
          style="
              text-align: center;
              border: none;
              border-top: 1px solid #ddd;
              border-bottom: 1px solid #ddd;
              margin: 0px;
              width: 40px;
              height: 39px;
          "
          />
          <div
            class="value-button"
            id="increase-${i}"
            onclick="increaseValue(${i})"
            value="Increase Value"
          >
            +
          </div>
  `;
  getEle("quantity-cart-list").innerHTML = content;
}

/**
 * Decrease and Increase quanity
 */

function increaseValue(id) {
  var value = parseInt(getEle(`quantity-product-${id}`).value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  getEle(`quantity-product-${id}`).value = value;
}

function decreaseValue(id) {
  var value = parseInt(getEle(`quantity-product-${id}`).value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? (value = 1) : "";
  value--;
  getEle(`quantity-product-${id}`).value = value;
}

function renderCartList(productCart) {
  var content = "";
  productCart.forEach((sp) => {
    var priceProduct = sp.price * 1 * sp.quantity;
    content += `
        <li
            class="align-items-center py-3 row m-auto"
            style="border-bottom: 1px solid #888"
          >
            <div class="col-2">
              <img
                class="img-fluid w-50"
                src="${sp.img}"
              />
            </div>
            <span class="col-3 card-title">${sp.name}</span>
            <div class="product-quantity col-3">
              <form>
                <div class="form-group">
                  <div class="input-group align-items-baseline">
                    <div
                      class="value-button"
                      id="decreaseCart"
                      onclick="decreaseValueCart(${sp.price}, ${sp.id})"
                      value="Decrease Value"
                    >
                      -
                    </div>
                    <input
                      type="number"
                      id="quantity-product__cart-${sp.id}"
                      value="${sp.quantity}"
                      style="
                          text-align: center;
                          border: none;
                          border-top: 1px solid #ddd;
                          border-bottom: 1px solid #ddd;
                          margin: 0px;
                          width: 40px;
                          height: 39px;
                  "
                    />
                    <div
                      class="value-button"
                      id="increaseCart"
                      onclick="increaseValueCart(${sp.price},${sp.id})"
                      value="Increase Value"
                    >
                      +
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="col-2" id="priceCartProduct__${sp.id}">$${priceProduct}</div>
            <div id="trash-${sp.id}" class="col-2" style="cursor: pointer" onclick="deleteProduct(${sp.id})">
              <i class="fa-solid fa-trash"></i>
            </div>
          </li> 
    `;
  });
  getEle("listAllCartProduct").innerHTML = content;
}

/**
 * Decrease and Increase quanity in cart list
 */

function increaseValueCart(price, index) {
  var value = parseInt(getEle(`quantity-product__cart-${index}`).value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  getEle(`quantity-product__cart-${index}`).value = value;
  getEle(`priceCartProduct__${index}`).innerHTML = "$" + value * price * 1;
  productList.capNhat(index, value);
  console.log(productList.arrCart);
  renderSum(productList.arrCart);
}

function decreaseValueCart(price, index) {
  var value = parseInt(getEle(`quantity-product__cart-${index}`).value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? (value = 1) : "";
  value--;
  getEle(`quantity-product__cart-${index}`).value = value;
  getEle(`priceCartProduct__${index}`).innerHTML = "$" + value * price * 1;
  productList.capNhat(index, value);
  renderSum(productList.arrCart);
}

/**
 * Total price of all product in cart list
 */

function renderSum(products) {
  var S = 0;
  var quantities = 0;
  products.forEach(function (sp) {
    S += sp.price * 1 * sp.quantity;
    quantities += sp.quantity * 1;
  });
  document.getElementsByClassName(
    "total"
  )[0].innerHTML = `<p class="total">Total: $ ${S}</p>`;
  getEle("quantity").innerHTML = `${quantities}`;
}

/**
 * Delete product in cart list
 */

function deleteProduct(id) {
  productList.removeProduct(id);
  renderSum(productList.arrCart);
  renderCartList(productList.arrCart);
}

getEle("clearAllProduct").addEventListener("click", function () {
  productList.removeAllProductInCartList();
  renderSum(productList.arrCart);
  renderCartList(productList.arrCart);
});
