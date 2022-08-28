const BASE_URL = "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api";
let idSanPhamCapNhat = null;
function renderTableSanPham(array) {
  let contentHTML = "";

  for (let i = 0; i < array.length; i++) {
    let sanPham = array[i];
    let trContent = ` <tr> 
                                    <td>  ${sanPham.id}</td>
                                    <td>  ${sanPham.name}</td>
                                    <td>  ${sanPham.price}</td>
                                    <td>  ${sanPham.screen}</td>
                                    <td>  ${sanPham.backCamera}</td>
                                    <td>  ${sanPham.frontCamera}</td>
                                    <td>  ${sanPham.img}</td>
                                    <td>  ${sanPham.desc}</td>
                                    <td>  ${sanPham.type}</td>
                                    <td>  ${sanPham.quantity}</td>
                                    <td>
                                               <button  class="btn btn-success "
                                               onclick=layThongTinChiTiet(${sanPham.id})
                                               >Sửa</button>
                                               <button  class="btn btn-danger "
                                               onclick=xoaSanPham(${sanPham.id})
                                               >Xoá</button>
  
                                    </td>
                             </tr>`;

    contentHTML += trContent;
  }
  document.getElementById("list-product").innerHTML = contentHTML;
}

//lay ds hien thi len trang

function hienThiDanhSach() {
  axios({
    url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
    method: "GET",
  })
    .then(function (res) {
      renderTableSanPham(res.data);
    })
    .catch(function (err) {
      console.log(("no", err));
    });
}
hienThiDanhSach();

// hàm lấy thông tin sản phẩm từ form

function layThongTinSanPhamTuForm() {
  let tenSp = document.getElementById("TenSP").value;
  let giaSp = document.getElementById("GiaSP").value;
  let screenSP = document.getElementById("screenSP").value;
  let backCamSP = document.getElementById("BackCamSP").value;
  let frontCamSP = document.getElementById("FrontCamSP").value;
  let hinhSP = document.getElementById("imgSP").value;
  let typeSP = document.getElementById("typeSP").value;
  let soluongSP = document.getElementById("quantitySP").value;

  return {
    name: tenSp,
    price: giaSp,
    screen: screenSP,
    backCamera: backCamSP,
    frontCamera: frontCamSP,
    img: hinhSP,
    type: typeSP,
    quantity: soluongSP,
  };
}

document.getElementById("btn-themSP").addEventListener("click", function () {
  let sanPhamThemMoi = layThongTinSanPhamTuForm();
  axios({
    url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
    method: "POST",
    data: sanPhamThemMoi,
  })
    .then(function (res) {
      console.log("created", res);
      //   gọi lại hàm lấy ds sản phẩm và hiển thị
      hienThiDanhSach();
    })
    .catch(function (err) {
      console.log("not created", err);
    });
});
// Xoa san pham
function xoaSanPham(id) {
  axios({
    url: `${BASE_URL}/products/${id}`,
    method: "DELETE",
  })
    .then(function (res) {
      console.log("deteled", res);
      hienThiDanhSach();
    })
    .catch(function (err) {
      console.log("not deteled", err);
    });
}

function layThongTinChiTiet(id) {
  //  lưu lại id sản phẩm được chọn cập nhật
  idSanPhamCapNhat = id;

  $("#myModal").modal("show");

  axios({
    url: `${BASE_URL}/products/${id}`,
    method: "GET",
  })
    .then(function (res) {
      console.log("chi tiet", res);
      let sanPham = res.data;
     

      document.getElementById("TenSP").value = sanPham.name;
      document.getElementById("GiaSP").value = sanPham.price;
      document.getElementById("screenSP").value = sanPham.screen;
      document.getElementById("BackCamSP").value =sanPham.backCamSP;
      document.getElementById("FrontCamSP").value =sanPham.frontCamSP;
      document.getElementById("imgSP").value =sanPham.img;
      document.getElementById("typeSP").value =sanPham.type;
      document.getElementById("quantitySP").value = sanPham.quantity;
    })
    .catch(function (err) {
      console.log("err", err);
    });
}

document.getElementById("btn-capNhatSP").addEventListener("click", function () {
    var sanPhamCapNhat = layThongTinSanPhamTuForm();
  
    axios({
      url: `${BASE_URL}/products/${idSanPhamCapNhat}`,
      method: "PUT",
      data: sanPhamCapNhat,
    })
      .then(function (res) {
        hienThiDanhSach();
      })
      .catch(function (err) {
        console.log(err);
      });
  });

window.xoaSanPham = xoaSanPham;
window.layThongTinChiTiet = layThongTinChiTiet;

