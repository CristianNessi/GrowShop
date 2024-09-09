// Función genérica para inicializar un Swiper con la configuración deseada
function initializeSwiper(containerClass) {
    return new Swiper(containerClass, {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto', // Ajusta el tamaño de las diapositivas automáticamente
        coverflowEffect: {
            rotate: 50, // Rotación de las diapositivas
            stretch: 0, // Estira las diapositivas
            depth: 100, // Profundidad 3D
            modifier: 1, // Modifica la intensidad del efecto
            slideShadows: true // Sombras en las diapositivas laterales
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true, // Paginación clickeable
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            resize: function () {
                this.update();  // Recalcular Swiper cuando se cambia el tamaño de la ventana
                this.updateSize();
            }
        },
        spaceBetween: 20, // Espacio entre diapositivas
    });
}

// Inicializar los Swipers para cada categoría
var iluminacionSwiper = initializeSwiper('.iluminacion-carousel');
var fertilizantesSwiper = initializeSwiper('.fertilizantes-carousel');
var semillasSwiper = initializeSwiper('.semillas-carousel');
var accesoriosSwiper = initializeSwiper('.accesorios-carousel');

document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar todos los botones de categoría
    var categoryButtons = document.querySelectorAll('.category-button');

    // Seleccionar todos los contenedores de productos en la sección de "otros productos"
    var productContainers = document.querySelectorAll('#otros-productos .product');

    // Muestra la categoría seleccionada y actualiza los otros productos
    function updateCategoryDisplay(selectedCategory) {
        // Ocultar todos los carruseles
        var carousels = document.querySelectorAll('.category-carousel');
        carousels.forEach(function (carousel) {
            carousel.classList.remove('active');
        });

        // Mostrar el carrusel correspondiente a la categoría seleccionada
        var activeCarousel = document.querySelector('.' + selectedCategory + '-carousel');
        activeCarousel.classList.add('active');

        // Actualizar, recalcular y reiniciar el Swiper correspondiente
        setTimeout(function () {
            if (selectedCategory === 'iluminacion') {
                iluminacionSwiper.update();
                iluminacionSwiper.slideTo(0, 0);
                iluminacionSwiper.updateSize();
            } else if (selectedCategory === 'fertilizantes') {
                fertilizantesSwiper.update();
                fertilizantesSwiper.slideTo(0, 0);
                fertilizantesSwiper.updateSize();
            } else if (selectedCategory === 'semillas') {
                semillasSwiper.update();
                semillasSwiper.slideTo(0, 0);
                semillasSwiper.updateSize();
            } else if (selectedCategory === 'accesorios') {
                accesoriosSwiper.update();
                accesoriosSwiper.slideTo(0, 0);
                accesoriosSwiper.updateSize();
            }
        }, 100);

        // Actualizar la sección "otros productos"
        productContainers.forEach(function (product) {
            var productCategory = product.getAttribute('data-category');

            // Mostrar productos que no pertenecen a la categoría seleccionada
            if (productCategory === selectedCategory) {
                product.style.display = 'none'; // Ocultar producto de la categoría seleccionada
            } else {
                product.style.display = 'block'; // Mostrar productos de otras categorías
            }
        });
    }

    // Añadir el evento de clic a cada botón de categoría
    categoryButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Obtener la categoría seleccionada desde el botón
            var selectedCategory = this.getAttribute('data-category');

            // Actualizar el carrusel y otros productos según la categoría seleccionada
            updateCategoryDisplay(selectedCategory);
        });
    });

    // Mostrar la primera categoría por defecto (ej: Iluminación)
    updateCategoryDisplay('iluminacion');
});

// Modal de contacto

// Obtener el modal
var contactModal = document.getElementById("contactFormModal");

// Obtener el botón que abre el modal
var contactLink = document.querySelector('nav a[href="#contacto"]');

// Obtener el <span> que cierra el modal
var span = document.getElementsByClassName("close")[0];

// Cuando el usuario haga clic en el enlace de contacto, abre el modal
contactLink.addEventListener('click', function (event) {
    event.preventDefault(); // Evitar que la página se desplace
    contactModal.style.display = "block";
});

// Cuando el usuario haga clic en <span> (x), cierra el modal
span.onclick = function () {
    contactModal.style.display = "none";
};

// Cuando el usuario haga clic en cualquier parte fuera del modal, cierra el modal
window.onclick = function (event) {
    if (event.target === contactModal) {
        contactModal.style.display = "none";
    }
};

// Carrito

// Inicializar el carrito como un array vacío
var cart = [];

// Obtener el enlace del carrito en el nav
var cartLink = document.querySelector('nav a[href="#carrito"]');
var cartCount = document.getElementById("cartCount"); // Elemento para mostrar el conteo en el nav

// Obtener el modal del carrito y el contenedor del resumen
var cartModal = document.getElementById("cartModal");
var cartItemsContainer = document.getElementById("cartItems");
var closeCart = document.getElementById("closeCart");
var checkoutForm = document.getElementById("checkoutForm");

// Obtener todos los botones de agregar al carrito
var addToCartButtons = document.querySelectorAll(".add-to-cart");

// Función para actualizar el contador en el nav
function updateCartCount() {
    if (cartCount) {
        cartCount.textContent = cart.length; // Actualiza el texto del contador con la longitud del carrito
    }
}

// Agregar event listener a cada botón
addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
        var product = this.getAttribute('data-product');
        var price = parseFloat(this.getAttribute('data-price'));

        // Agregar el producto al carrito
        cart.push({ product, price });

        // Actualizar el resumen del carrito
        updateCartSummary();
        updateCartCount(); // Actualizar el contador en el nav
    });
});

// Función para actualizar el resumen del carrito
function updateCartSummary() {
    var total = 0;
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        var div = document.createElement('div');
        div.textContent = `${item.product} - $${item.price.toFixed(2)}`;
        cartItemsContainer.appendChild(div);
        total += item.price;
    });

    var totalDiv = document.createElement('div');
    totalDiv.textContent = `Total: $${total.toFixed(2)}`;
    cartItemsContainer.appendChild(totalDiv);
}

// Mostrar el modal del carrito cuando se haga clic en el enlace del carrito
cartLink.addEventListener('click', function (event) {
    event.preventDefault(); // Evitar que la página se desplace
    updateCartSummary(); // Actualizar el resumen antes de mostrar el modal
    cartModal.style.display = 'block';
});

// Cerrar el modal del carrito
closeCart.addEventListener('click', function () {
    cartModal.style.display = 'none';
});

// Manejar el envío del formulario
checkoutForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    // Obtener los datos del formulario
    var formData = new FormData(checkoutForm);
    var fullName = formData.get('fullName');
    var email = formData.get('email');
    var address = formData.get('address');
    var paymentMethod = formData.get('paymentMethod');

    // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
    console.log('Nombre Completo:', fullName);
    console.log('Correo Electrónico:', email);
    console.log('Dirección:', address);
    console.log('Método de Pago:', paymentMethod);

    // Limpiar el carrito y cerrar el modal
    cart = [];
    updateCartSummary();
    updateCartCount(); // Actualizar el contador en el nav
    cartModal.style.display = 'none';
});
