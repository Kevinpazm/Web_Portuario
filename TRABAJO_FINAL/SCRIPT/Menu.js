document.addEventListener("DOMContentLoaded", function () {

    const boton = document.getElementById("menu-toggle");
    const menu = document.getElementById("side-menu");
    const cerrar = document.getElementById("close-menu");
    const overlay = document.getElementById("overlay");

    function abrirMenu() {
        menu.classList.add("active");
        overlay.classList.add("active");
        boton.innerHTML = "✕";
    }

    function cerrarMenu() {
        menu.classList.remove("active");
        overlay.classList.remove("active");
        boton.innerHTML = "☰";
    }

    boton.addEventListener("click", function () {

        if(menu.classList.contains("active")){
            cerrarMenu();
        }else{
            abrirMenu();
        }

    });

    cerrar.addEventListener("click", cerrarMenu);
    overlay.addEventListener("click", cerrarMenu);

});