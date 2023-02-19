function CallApi() {
  this.fetchListData = function () {
    return axios({
      url: "https://63ed9ddf388920150dcffee1.mockapi.io/product",
      method: "GET",
    });
  };

  this.getListData = function (id) {
    return axios({
      url: `https://63ed9ddf388920150dcffee1.mockapi.io/product/${id}`,
      method: "GET",
    });
  };
}
