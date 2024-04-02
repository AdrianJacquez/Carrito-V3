const carrito = document.getElementById("carrito");
const template = document.getElementById("template");
const Footer = document.getElementById("Footer");
const templateFooter = document.getElementById("templateFooter");
const fragment = document.createDocumentFragment();
const finalizarCompra = document.getElementById("finalizarCompra");

//evento de click que abarca a varios botones
document.addEventListener("click", (e) => {
  if (e.target.matches(".card .btn-primary")) {
    console.log("ejecutar agregar al carrito");
    agregarCarrito(e);
  }
  if (e.target.matches(".list-group-item .btn-success")) {
    console.log("ejecutar agregar al carrito");
    btnAumentar(e);
  }
  if (e.target.matches(".list-group-item .btn-danger")) {
    console.log("ejecutar agregar al carrito");
    btnDisminuir(e);
  }
  if (e.target.matches(".card .btn-warning")) {
    console.log("Compra finalizada");
    btnFinalizarCompra();
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
};

const pintarCarrito = () => {
  carrito.textContent = "";

  Object.values(carritoObjeto).forEach((item) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".lead").textContent = item.titulo;
    clone.querySelector(".rounded-pill").textContent = item.cantidad;
    clone.querySelector(".badge").textContent = item.cantidad;
    clone.querySelector("div .lead span").textContent = formatCurrency(
      item.precio * item.cantidad
    );

    clone.querySelector(".btn-danger").dataset.id = item.id;
    clone.querySelector(".btn-success").dataset.id = item.id;
    fragment.appendChild(clone);
  });
  carrito.appendChild(fragment);
  pintarFooter();
};

const formatCurrency = (amount) => {
  // Formatear el número como moneda
  return amount.toLocaleString("es-ES", { style: "currency", currency: "USD" });
};

const pintarFooter = () => {
  Footer.textContent = "";

  const total = carritoObjeto.reduce(
    (acc, current) => acc + current.precio * current.cantidad,
    0
  );

  const clone = templateFooter.content.cloneNode(true);
  clone.querySelector("p span").textContent = formatCurrency(total);

  Footer.appendChild(clone);
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
    return item;
  });
  pintarCarrito();
};

//muestra un mensaje despues de que se le diera click a un boton, y al darle aceptar la pagina se restaura
const btnFinalizarCompra = () => {
  Swal.fire({
    title: "Compra realizada con éxito",
    text: "¡Gracias, vuelva pronto!",
    icon: "success",
  }).then((result) => {
    // Si el usuario confirma la alerta
    if (result.isConfirmed) {
      //recarga la pagina despues de la confirmacion del la alerta
      window.location.reload();
    }
  });
};
