// LOGO INSTITUCIONAL
const logo = "logo.png";
// NÚMERO DE WHATSAPP PARA PEDIDOS
const WHATSAPP_NUMBER = "59157009952";

// LISTA DE LOS 27 PLATOS

const platos = [

    // LA PAZ
    ["La Paz", "Chairo paceño", "Sopa tradicional con chuño, verduras y carne.", "chairo.jpg", 45],
    ["La Paz", "Plato paceño", "Choclo, habas, papa, queso y llajua.", "plato-paceño.jpg", 35],
    ["La Paz", "Fricasé", "Preparación paceña de cerdo con mote y caldo picante.", "fricase.jpg", 40],

    // ORURO
    ["Oruro", "Charquekan", "Charque acompañado de mote, huevo y papa.", "charquekan.jpg", 40],
    ["Oruro", "Thimpu", "Carne de cordero con arroz, papa y ají.", "thimpu.jpg", 40],
    ["Oruro", "Intendente", "Plato abundante de carnes y acompañamientos.", "intendente.jpg", 45],

    // POTOSÍ
    ["Potosí", "Kalapurka", "Sopa espesa tradicional servida muy caliente.", "kalapurka.jpg", 40],
    ["Potosí", "Ají de pataskha", "Maíz pelado preparado con ají y carne.", "pataskha.jpg", 45],
    ["Potosí", "Cazuela de cordero", "Cazuela regional de cordero con verduras.", "cazuela.jpg", 40],

    // COCHABAMBA
    ["Cochabamba", "Silpancho", "Arroz, papa, carne apanada, huevo y ensalada.", "silpancho.jpg", 30],
    ["Cochabamba", "Pique macho", "Carne, salchicha, papa frita, huevo y verduras.", "pique-macho.jpg", 50],
    ["Cochabamba", "Chicharrón", "Cerdo dorado acompañado de mote y llajua.", "chicharron.jpg", 42],

    // CHUQUISACA
    ["Chuquisaca", "Mondongo", "Cerdo con mote y ají colorado.", "mondongo.jpg", 35],
    ["Chuquisaca", "Fritanga", "Preparación tradicional de cerdo con ají.", "fritanga.jpg", 35],
    ["Chuquisaca", "Chorizo chuquisaqueño", "Chorizo regional con pan y acompañamientos.", "chorizo.jpg", 30],

    // TARIJA
    ["Tarija", "Saice tarijeño", "Carne picada con arvejas, papa y arroz.", "saice.jpg", 30],
    ["Tarija", "Arvejada", "Arvejas preparadas con papa, huevo y queso.", "arvejada.jpg", 25],
    ["Tarija", "Ranga", "Preparación tradicional con ají y papa.", "ranga.jpg", 30],

    // SANTA CRUZ
    ["Santa Cruz", "Majadito", "Arroz con charque o pollo, huevo y plátano.", "majadito.jpg", 32],
    ["Santa Cruz", "Locro cruceño", "Caldo tradicional con arroz y carne o pollo.", "locro.jpg", 30],
    ["Santa Cruz", "Arroz con queso", "Arroz cremoso con queso, típico del oriente.", "arroz-queso.jpg", 20],

    // BENI
    ["Beni", "Pacú frito", "Pescado de río acompañado de yuca o arroz.", "pacu.jpg", 50],
    ["Beni", "Masaco", "Yuca o plátano mezclado con queso o charque.", "masaco.jpg", 25],
    ["Beni", "Locro carretero", "Caldo regional con arroz y carne.", "locro-carretero.jpg", 30],

    // PANDO
    ["Pando", "Sudado de surubí", "Pescado preparado en caldo con verduras.", "sudado-surubi.jpg", 45],
    ["Pando", "Pan de arroz", "Pan tradicional elaborado con arroz y queso.", "pan-arroz.jpg", 8],
    ["Pando", "Farofa", "Acompañamiento a base de harina de yuca.", "farofa.jpg", 20]

];

const grid = document.getElementById("dishGrid");

const cart = new Map();

const money = numero => `Bs ${numero.toFixed(2)}`;

// MOSTRAR LOS PLATOS

function renderPlatos(filtro = "Todos") {

    const lista = filtro === "Todos"
        ? platos
        : platos.filter(plato => plato[0] === filtro);

    grid.innerHTML = lista.map(plato => {

        const [departamento, nombre, descripcion, imagen, precio] = plato;

        return `

        <article class="dish-card">

            <div class="dish-photo">

                <img
                    src="imagenes/${encodeURIComponent(imagen)}"
                    alt="${nombre}"
                    loading="lazy"
                    onerror="this.style.display='none';
                    this.nextElementSibling.hidden=false"
                >

                <div class="photo-fallback" hidden>
                    ${nombre}
                </div>

                <span class="dish-tag">
                    ${departamento.toUpperCase()}
                </span>

            </div>

            <div class="dish-info">

                <span class="dish-dept">
                    SABOR REGIONAL
                </span>

                <h3>${nombre}</h3>

                <p class="dish-desc">
                    ${descripcion}
                </p>

                <div class="dish-buy">

                    <strong class="dish-price">
                        ${money(precio)}
                    </strong>

                    <button class="add-cart" data-name="${nombre}">
                        + AGREGAR
                    </button>

                </div>

            </div>

        </article>

        `;

    }).join("");

}


// AGREGAR PRODUCTOS AL CARRITO

function addToCart(nombre) {

    const plato = platos.find(p => p[1] === nombre);

    if (!plato) return;

    const item = cart.get(nombre) || {
        name: nombre,
        price: plato[4],
        qty: 0
    };

    item.qty++;

    cart.set(nombre, item);

    renderCart();

}


// CAMBIAR CANTIDAD

function changeQty(nombre, cambio) {

    const item = cart.get(nombre);

    if (!item) return;

    item.qty += cambio;

    if (item.qty <= 0) {
        cart.delete(nombre);
    } else {
        cart.set(nombre, item);
    }

    renderCart();

}


// MOSTRAR CARRITO

function renderCart() {

    const items = [...cart.values()];

    const cantidad = items.reduce(
        (suma, item) => suma + item.qty, 0
    );

    const total = items.reduce(
        (suma, item) => suma + item.price * item.qty, 0
    );

    document.getElementById("cartCount").textContent = cantidad;

    document.getElementById("cartTotal").textContent = money(total);

    document.getElementById("cartItems").innerHTML = items.length

        ? items.map(item => `

            <div class="cart-item">

                <div>

                    <strong>${item.name}</strong>

                    <small>
                        ${money(item.price)} por unidad
                    </small>

                    <div class="qty-controls">

                        <button
                            data-action="minus"
                            data-name="${item.name}">
                            −
                        </button>

                        <span>${item.qty}</span>

                        <button
                            data-action="plus"
                            data-name="${item.name}">
                            +
                        </button>

                        <button
                            class="remove-item"
                            data-action="remove"
                            data-name="${item.name}">
                            Eliminar
                        </button>

                    </div>

                </div>

                <div class="cart-item-right">
                    ${money(item.price * item.qty)}
                </div>

            </div>

        `).join("")

        : `<p class="empty-cart">
            Tu carrito está vacío. Agrega tus platos favoritos.
           </p>`;

}


// ABRIR Y CERRAR CARRITO

function toggleCart(abrir) {

    document.body.classList.toggle("cart-open", abrir);

    document.getElementById("cartPanel")
        .setAttribute("aria-hidden", String(!abrir));

}

document.getElementById("openCart").addEventListener("click", () => {
    toggleCart(true);
});

document.getElementById("closeCart").addEventListener("click", () => {
    toggleCart(false);
});

document.getElementById("cartOverlay").addEventListener("click", () => {
    toggleCart(false);
});


// BOTÓN AGREGAR

grid.addEventListener("click", evento => {

    const boton = evento.target.closest(".add-cart");

    if (boton) {

        addToCart(boton.dataset.name);

        boton.textContent = "AGREGADO ✓";

        setTimeout(() => {
            boton.textContent = "+ AGREGAR";
        }, 900);

    }

});


// FILTRAR POR DEPARTAMENTO

document.getElementById("filters").addEventListener("click", evento => {

    const boton = evento.target.closest(".filter");

    if (!boton) return;

    document.querySelectorAll(".filter").forEach(b => {
        b.classList.remove("active");
    });

    boton.classList.add("active");

    renderPlatos(boton.dataset.filter);

});


// BOTONES DEL CARRITO

document.getElementById("cartItems").addEventListener("click", evento => {

    const boton = evento.target.closest("button[data-action]");

    if (!boton) return;

    const nombre = boton.dataset.name;
    const accion = boton.dataset.action;

    if (accion === "plus") {
        changeQty(nombre, 1);
    }

    if (accion === "minus") {
        changeQty(nombre, -1);
    }

    if (accion === "remove") {
        cart.delete(nombre);
        renderCart();
    }

});


// ENVIAR PEDIDO POR WHATSAPP

document.getElementById("checkout").addEventListener("click", () => {

    const items = [...cart.values()];

    if (items.length === 0) {

        alert("Agrega al menos un plato a tu carrito.");

        return;

    }

    const total = items.reduce(
        (suma, item) => suma + item.price * item.qty, 0
    );

    const lineas = items.map(item =>
        `- ${item.name} x${item.qty} = ${money(item.price * item.qty)}`
    );

    const mensaje = `
Hola, deseo realizar este pedido en SABORES BOLIVIANOS:

${lineas.join("\n")}

TOTAL: ${money(total)}

¿Podrían confirmarme la disponibilidad?
    `;

    const enlace = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;

    window.open(enlace, "_blank");

});


// MENÚ PARA CELULARES

document.getElementById("menuToggle").addEventListener("click", () => {

    document.getElementById("nav").classList.toggle("show");

});

document.querySelectorAll(".nav a").forEach(enlace => {

    enlace.addEventListener("click", () => {

        document.getElementById("nav").classList.remove("show");

    });

});


// AÑO AUTOMÁTICO

document.getElementById("year").textContent =
    new Date().getFullYear();


// INICIAR PÁGINA

renderPlatos();

renderCart();