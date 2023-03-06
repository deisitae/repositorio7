const cartContainer = document.querySelector(".cart-container");
const botonAgregar = document.getElementsByClassName("boton");
const listaCarrito= document.querySelector(".cart-list");
const totalCarrito=document.querySelector("#cart-total-value");
const contadorCarrito=document.querySelector("#cart-count-info");
let total=0;
let contador=0;


let productos=[]
let listaProductos=[]

cargarStorage();
showCarrito();
obtenerInfo();

function showCarrito() {
   // show/hide carrito
  document.getElementById("cart-btn").addEventListener("click", () => {
    cartContainer.classList.toggle("show-cart-container");
  });  

}

function obtenerInfo(){
for (const boton of botonAgregar) {
  boton.addEventListener('click', () => {
    let contenido=boton.parentElement.parentElement.parentElement.parentElement.parentElement;
    imagenSource=contenido.getElementsByClassName("producto__imagen")[0].src;
    productoNombre=contenido.getElementsByClassName("producto__nombre")[0].outerText;
    productoPrecio=contenido.getElementsByClassName("producto__precio")[0].outerText;
    const chars = {'$':'','.':''};
    productoPrecioLimpio = parseInt(productoPrecio.replace(/[$.]/g, m => chars[m]));
    productoCantidad=contenido.getElementsByClassName("cantidad")[0].valueAsNumber;
    if (productoCantidad>0){
      if(listaProductos.includes(productoNombre)){
        listaCarrito.innerHTML="";
        for(i=0;i<productos.length;i++){
          if(productoNombre===productos[i][1]){
            productos[i][2]+=productoCantidad;
            productos[i][4]+=productoPrecioLimpio*productoCantidad;
          }
          agregarCarrito(productos[i],productos[i][2]);
          localStorage.clear();
          localStorage.setItem("productos", JSON.stringify(productos));

        }
      } 
      else{
        listaItem=[imagenSource,productoNombre, productoCantidad, productoPrecioLimpio,productoPrecioLimpio*productoCantidad];
        productos.push(listaItem);
        listaProductos.push(productoNombre)
        agregarCarrito(listaItem,productoCantidad);
        localStorage.clear();
        localStorage.setItem("productos", JSON.stringify(productos));}        
  };  
})}}

function agregarCarrito(lista, cantidad){
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");
  plantilla=`<img src = "${lista[0]}" alt = "product image">
      <div class = "cart-item-info">
        <h3 class = "cart-item-name">${lista[1]}</h3>
        <span class = "cart-item-price">${lista[3]}</span>
        <span class = "cart-item-quantity">Unidades: ${cantidad}</span>
      </div>

      <button type = "button" class = "cart-item-del-btn">
        <i class = "fas fa-times"></i>
      </button>`;
  cartItem.innerHTML=plantilla;
  listaCarrito.appendChild(cartItem);
  total+=lista[4];
  totalCarrito.innerHTML=`$${total}`
  contador+=lista[2];
  contadorCarrito.innerHTML=contador;
  removerElemento(cartItem,lista);
}

function removerElemento(cartItem,lista){
  let boton=cartItem.querySelector(".cart-item-del-btn");
  boton.addEventListener('click', () => {
    cartItem.remove()
    for(i=0;i<productos.length;i++){
      if(lista[1]===productos[i][1]){
        productos.splice(i, 1);
        let index = listaProductos.indexOf(lista[1]);
        listaProductos.splice(index, 1); 
        localStorage.clear()
        localStorage.setItem("productos", JSON.stringify(productos)); 
        total-=lista[4];
        totalCarrito.innerHTML=`$${total}`;
        contador-=lista[2];
        contadorCarrito.innerHTML=contador;
      }}  
})

}

function cargarStorage(){
  document.addEventListener("DOMContentLoaded", () => {
   for(i in (JSON.parse(localStorage.getItem("productos")))){
    productos.push((JSON.parse(localStorage.getItem("productos")))[i])
    listaProductos.push(((JSON.parse(localStorage.getItem("productos")))[i])[1])
    agregarCarrito((JSON.parse(localStorage.getItem("productos")))[i],(JSON.parse(localStorage.getItem("productos")))[i][2]);
   }
});
}


