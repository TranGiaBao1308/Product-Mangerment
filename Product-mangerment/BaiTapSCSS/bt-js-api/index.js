// import { getData } from "./API";

// import { Product } from "./product";

let productList = [];
let filterValue = " ";
let gioHang = [];
let toTal = 0;
// filter
let filter = () => {
  filterValue = document.getElementById("filter").value;
  console.log(filterValue);
  displayItemByFilter(filterValue);
};
document.getElementById("filter").addEventListener("change", filter);
// lay du lieu
let getData = () => {
  axios({
    url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
    method: "GET",
  })
    .then((res) => {
      productList = res.data;
      displayItemByFilter(filterValue);
    })
    .catch((err) => {
      console.log("fail", err);
    });
};

getData();
// xuat ra man hinh khi co filter
 let displayItemByFilter = (filterKw) => {
  let cardEle = document.getElementById("card");
  let htmlContent = "";
  let div = "";
  productList.forEach((item) => {
    if (item.type === filterKw) {
      div = displayItem(item);
    } else {
      if (filterKw === " ") {
        div = div = displayItem(item);
      }
    }
    htmlContent += div;
  });
  cardEle.innerHTML = htmlContent;
};

// ham xuat du lieu
export let displayItem = (item) => {
  return `
    <div class="col-md-4">
        <div class="card" id=${item.id}>
            <div class="card-header">
                <img style="width:130px" src="${item.img}"></img>
            </div>
            <div class="card-body">
                <p>${item.name}</p>
                <p>${item.price}</p>
                <p>${item.screen}</p>
                <p>${item.backCamera}</p>
                <p>${item.frontCamera}</p>
                <p>${item.desc}</p>
                <p>${item.type}</p>
                
            </div>
            <div class="card-footer">
                <button id ="btnCart" class="btn btn-primary" onclick ="addCard(${item.id})">Add</button>
            </div>
        </div>
    </div>
    `;
};

// cho san pham vao gio hang
let addCard = (id) => {
  // check exist
  if (gioHang.findIndex((item) => item.id == id) !== -1) {
    // co ton tai
    let index = gioHang.findIndex((item) => item.id == id);

    gioHang[index].quantity += 1;
    renderCart(gioHang);
  } else {
    // them moi
    let sanPham = productList.filter((i) => i.id == id);
    let cartItem = {
      id: sanPham[0].id,
      name: sanPham[0].name,
      price: sanPham[0].price,
      quantity: 1,
      img: sanPham[0].img,
    };
    gioHang = [...gioHang, cartItem];
    renderCart(gioHang);
  }
};

// tang giam so luong, khi ve 0 thi xoa item ra khoi gio hang
let changeQuantity = (char, id) => {
  let index = gioHang.findIndex((item) => item.id == id);
  if (char === "-") {
    gioHang[index].quantity -= 1;
    if (gioHang[index].quantity <= 0) {
      gioHang.splice(index, 1);
    }
  }
  if (char === "+") {
    gioHang[index].quantity += 1;
  }
  console.log(gioHang);
  renderCart(gioHang);
};
// xuat gio hang ra man hinh
let renderCart = (gioHang) => {
  let contentHTML = "";

  gioHang.forEach((i) => {
    let trContent = ` <tr>

     <td>  ${i.name}</td>
     <td>  ${i.price}</td>
     <td> 
        <button class="btn btn-primary" onclick="changeQuantity('-',${i.id})" id="decrease" >-</button>
            <input type="number" readonly id="quantity" value="${i.quantity}" />
        <button class="btn btn-primary" onclick="changeQuantity('+',${i.id})" id="increase" >+</button>
     </td>
     <td>     <img style="width:30px" src="${i.img}"></img></td>

     <td>

                <button  class="btn btn-danger "
                onclick=xoaItem(${i.id})
                >Xoá</button>

     </td>
 </tr>`;

    contentHTML += trContent;
  });
  document.getElementById("tbodyCart").innerHTML = contentHTML;
};
// tinh hoa don
// document.getElementById("btn-cash").addEventListener('click', (gioHang) => {

 
// });
let tinhTien = () => {
  gioHang.forEach((item) => {

    return toTal +=item.price * item.quantity ;
   });
  
   document.getElementById("cashOut").value = toTal;
}
// Xoa don hang
let xoaItem = (id) => {
 
  let index = gioHang.findIndex((item) => item.id == id);

  gioHang.splice(index, 1);
  renderCart(gioHang);
};
// CLEAR gio hang
let clearCart = () => {
  gioHang = [];
  document.getElementById("cashOut").value = 0;
 renderCart(gioHang);
}


// luu gio hang vao local store
let saveData = function () {
  // chuyển gioHang => JSON
  const jsonData = JSON.stringify(gioHang);
  localStorage.setItem("gioHang", jsonData);
};

saveData();

let getDaTa = function () {
  let dataJson = localStorage.getItem("gioHang");
  if (dataJson) {
    let data = JSON.parse(dataJson);
    for (let i = 0; i < data.length; i++) {
      let newItem = new cartItem(
        data[i].id,
        data[i].name,
        data[i].price,
        data[i].quantity,
        data[i].img,
       
      );
    gioHang.push(newItem);
    }

   renderCart(gioHang);
  }
};
getDaTa();
window.addCard = addCard;
window.changeQuantity = changeQuantity;
window.xoaItem = xoaItem;
window.tinhTien = tinhTien;
window.clearCart = clearCart;