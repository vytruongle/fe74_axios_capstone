function ProductList() {
  this.arr = [];
  this.arrCart = [];
  this.addProduct = function (arr) {
    this.arr.push(arr);
  };
  this.addCartList = function (product) {
    this.arrCart.push(product);
  };

  this.timViTri = function (productId) {
    var index = -1;
    this.arrCart.forEach(function (sp, i) {
      if (sp.id == productId) {
        index = i;
      }
    });
    return index;
  };

  this.capNhat = function (index, value) {
    var index = this.timViTri(index);
    if (index !== -1) {
      this.arrCart[index].quantity = value;
    }
  };

  this.removeAllProduct = function () {
    this.arr.splice(0, this.arr.length);
  };

  this.removeAllProductInCartList = function () {
    this.arrCart.splice(0, this.arrCart.length);
  };

  this.removeProduct = function (id) {
    var index = this.timViTri(id);
    if (index !== -1) {
      this.arrCart.splice(index, 1);
    }
  };
}
