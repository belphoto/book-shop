let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    return (shop.innerHTML = shopItemsData
      .map((x)=>{
        let { id, author, name, price, desc, img } =x;
        let search = basket.find((x) => x.id === id) || []
      return `
      <div id=product-id-${id} class="item">
      <img width="220" src=${img} alt="">
      <div class="details">
        <h4>${author}</h4>
        <h3>${name}</h3>
        <div class="buttons">
  <button data-modal-btn="my_modal1" class = "mym1">Show more</button>
  <div data-modal-window="my_modal1" class="modal">
    <div class="modal_content">
      <div class="modal_inner">
        <div class="modal_title">Description</div>
        <div class="close_modal_window">&times;</div>
      </div>
      <h2>${desc} </h2>
    </div>
  </div>
        </div>
        <div class="price-quantity">
          <h2>$ ${price} </h2>
          <div class="buttons">
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
            <div id=${id} class="quantity">
            ${search.item === undefined ? 0 : search.item}
            </div>
            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>
        </div>
      </div>
    </div>
      `;
    }).join(""));
};

generateShop();

let btns = document.querySelectorAll("*[data-modal-btn]");

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function () {
    let name = btns[i].getAttribute('data-modal-btn');
    let modal = document.querySelector("[data-modal-window='" + name + "']");
    modal.style.display = "block";
    let close = modal.querySelector(".close_modal_window");
    close.addEventListener('click', function () {
      modal.style.display = "none";
    });
  });
};

window.onclick = function (event) {
  if (event.target.hasAttribute('data-modal-window')) {
    let modals = document.querySelectorAll('*[data-modal-window]');
    for (let i = 0; i < modals.length; i++) {
      modals[i].style.display = "none";
    }
  }
};

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if(search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  }
  else{
    search.item += 1;
  }

 // console.log(basket);
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if(search === undefined) return
  else if(search.item === 0) return;
  else{
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);

  // console.log(basket);

  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
