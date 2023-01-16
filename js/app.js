// Variables 
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    // Cuando agregas un curso presionando "Agregar al Carrrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Muestra los cursos del local Storage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    });

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];/* Reseteamos el arreglo */

        limpiarHTML();/* Eliminamos todo el HTML */
    })

}




// Funciones
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// Elimina un curso del carrito
function eliminarCurso(e) {

    e.preventDefault();
 
    if(e.target.classList.contains("borrar-curso")){
 
        const id = e.target.getAttribute("data-id");
 
        const existe = articulosCarrito.some( curso => curso.id === id && curso.cantidad > 1);
 
        if(existe){
 
       
            const cursos = articulosCarrito.map( curso => {
 
                if(curso.id === id){
    
                    curso.cantidad--;
                    return curso;
                }else{
                    return curso;
                }
            });
            console.log(id)
            articulosCarrito = [...cursos];
 
        }else{
            
            articulosCarrito = articulosCarrito.filter(curso => curso.id !== id);
 
        }
        carritoHTML(); 
    }
    // const cursoId = e.target.getAttribute('data-id');
    //  if(e.target.classList.contains('borrar-curso')) {
    //     // Eliminar el arreglo de articulosCarrito por el data-id
    //     articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
    //     carritoHTML();/* Iterar sobre el carrito y msotrar su HTML */
    // }
}

// Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {
    // console.log(curso);
    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    // Revisa si un elemento ya se encuentra en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id); /* El some revisa si el producto existe o no y retorna un false o true */
    if (existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; /* Retorna objetos actualizados */
            } else {
                return curso; /* Retorna los objetos que no son duplicados */
            }
        });
        articulosCarrito = [...cursos];
    } else {
        // Agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];

    }


    carritoHTML();
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {
    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML

    articulosCarrito.forEach(curso => {
        const {
            imagen,
            titulo,
            precio,
            id,
            cantidad
        } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
              <img src="${imagen}" width="100">  
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td class="cantidad">${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;

        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
    // Sincronizar con Storage
    sincronizarStorage();
}
function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}


// Elimina los cursos del tbody
function limpiarHTML() {
    // Forma lenta
    // contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}



