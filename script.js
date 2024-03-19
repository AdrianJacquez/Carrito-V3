//Uso de e.stopPropagation() para evitar el burbujeo de los elementos
const formulario = document.querySelector("form");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Me diste click ");
});
