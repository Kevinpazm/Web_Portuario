window.addEventListener("load",()=>{
const botones=document.querySelectorAll(".btn-login");

    botones.forEach(boton=>{

        if(localStorage.getItem("estaLogueado")==="true"){  
            boton.textContent="👤 Kevin (Cerrar Sesión)";
            boton.href="#";
            boton.onclick=function(e){
            e.preventDefault();
            localStorage.removeItem("estaLogueado");
            window.location.href="Index.html";

};

}else{
    boton.textContent="👤 Iniciar Sesión";
    boton.href="inicioSesion.html";
    }
});
});

function protegerPagina(){

    if(localStorage.getItem("estaLogueado") !== "true"){
        document.getElementById("modalLogin").style.display="flex";
    }

}
function irLogin(){
    window.location.href="inicioSesion.html";
}

function cerrarModal(){
    window.location.href="Index.html";
}