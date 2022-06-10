//variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listarCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    //Cuando agregas un curso presionando "Agregar al Carrito"
    listarCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminaCurso);

    //Muestra cursos del localStorage
    document.addEventListener('DOMContentLoaded', ()=>{
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    });

    //vaciar el carro
    vaciarCarritoBtn.addEventListener('click', ()=>{
        articulosCarrito = []; //resetea el arreglo
        limpiarHTML(); //eliminamos todo el html
    });

}

//funciones

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }

}

//elimina un curso del carrito
function eliminaCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const  cursoId = e.target.getAttribute('data-id');
        //elimina del arreglo de carrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
        
        carritoHTML();
    }
}




//lee el contenido del HTML al que se le dio click y extrae la informacion del curso
function leerDatosCurso(curso) {
    // console.log(curso);
    //crear objeto con curso actual
    let infoCurso = {
        image: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //revisa si un elemento ya existe en el carro
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //actualizar cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++; //retorna el objeto actualizado
                return curso;
            } else {
                return curso; // retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        //agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito,infoCurso];
    }
    carritoHTML();
}

//Muestra el Carrito de compras en el HTML
function carritoHTML() {

    //limpiar el HTML
    limpiarHTML();

    //recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso =>{
        const {image, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${image}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}"> X </a></td>
        `;
        //agrega el HMTL del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })

        //agregar el carrito de compras al storage
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('carrito',JSON.stringify(articulosCarrito));
}


//Elimina los cursos del tbody
function limpiarHTML() {
    //forma lenta
    //contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}



