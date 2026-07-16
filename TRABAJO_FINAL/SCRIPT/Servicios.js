let servicio = "";
let precio = 0;
function abrirModal(nombre, valor){

    servicio = nombre;
    precio = valor;

document.getElementById("modal").style.display = "flex";
document.getElementById("nombreServicio").innerHTML ="<b>Servicio:</b> " + nombre;
document.getElementById("precioServicio").innerHTML ="<b>Precio:</b> $" + valor;
}

function cerrar(){
    document.getElementById("modal").style.display="none";
}

function confirmar(){

    let pago = document.querySelector('input[name="pago"]:checked').value;
    let solicitud = "TPM-" + Math.floor(Math.random()*90000+10000);
    let fila =`<tr><td>${solicitud}</td><td>${servicio}</td><td>${pago}</td><td style="color:green;">Pendiente</td></tr>`;

document.querySelector("#tabla tbody").innerHTML += fila;

alert("Servicio contratado correctamente.");

cerrar();

}