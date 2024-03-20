const carrito = document.getElementById("carrito");
const template = document.getElementById("template");
const footer = document.getElementById("footer");
const templateFooter = document.getElementById("templateFooter");
const fragment = document.createDocumentFragment();

document.addEventListener("click", (e) => {
  if (e.target.matches(".card .btn-primary")) {
    console.log("ejecutar agregar al carrito");
    agregarCarrito(e);
  }
  if (e.target.matches(".list-group-item .btn-success")) {
    btnAumentar(e);
  }
  if (e.target.matches(".list-group-item .btn-danger")) {
    btnDisminuir(e);
  }
});

let carritoObjeto = [];

const agregarCarrito = (e) => {
  // console.log(e.target.dataset);
  // console.log(e.target.dataset.fruta);

  const producto = {
    titulo: e.target.dataset.fruta,
    id: e.target.dataset.fruta,
    cantidad: 1,
    precio: parseInt(e.target.dataset.precio),
  };

  const indice = carritoObjeto.findIndex((item) => item.id === producto.id);
  if (indice === -1) {
    carritoObjeto.push(producto);
  } else {
    carritoObjeto[indice].cantidad++;
  }
  console.log(carritoObjeto);

  pintarCarrito();
  pintarFooter();
};

const pintarCarrito = () => {
  carrito.textContent = "";

  Object.values(carritoObjeto).forEach((item) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".lead").textContent = item.titulo;
    clone.querySelector(".rounded-pill").textContent = item.cantidad;
    clone.querySelector(".badge").textContent = item.cantidad;
    clone.querySelector("div .lead span").textContent =
      item.precio * item.cantidad;
    clone.querySelector(".btn-danger").dataset.id = item.id;
    clone.querySelector(".btn-success").dataset.id = item.id;
    fragment.appendChild(clone);
  });
  carrito.appendChild(fragment);
  pintarFooter();
};

const btnAumentar = (e) => {
  console.log("me diste click", e.target.dataset.id);
  carritoObjeto = carritoObjeto.map((item) => {
    if (item.id === e.target.dataset.id) {
      item.cantidad++;
    }
    return item;
  });
  pintarCarrito();
};

const btnDisminuir = (e) => {
  console.log("me diste click", e.target.dataset.id);
  carritoObjeto = carritoObjeto.map((item) => {
    if (item.id === e.target.dataset.id) {
      if (item.cantidad > 0) {
        item.cantidad--;
      }
    }
  });
  pintarCarrito();
};
