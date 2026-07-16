const LATITUD = -0.9516;
const LONGITUD = -80.7142;

const urlMarine =
`https://marine-api.open-meteo.com/v1/marine?latitude=${LATITUD}&longitude=${LONGITUD}&current=wave_height&hourly=sea_surface_temperature`;

const urlWeather =
`https://api.open-meteo.com/v1/forecast?latitude=${LATITUD}&longitude=${LONGITUD}&current=wind_speed_10m`;

async function cargarEstadoPuerto(){

try{

    const marine=await fetch(urlMarine);
    const weather=await fetch(urlWeather);
    const datosMarine=await marine.json();
    const datosWeather=await weather.json();
    const ola=datosMarine.current.wave_height;
    const viento=datosWeather.current.wind_speed_10m;
    const temperatura=datosMarine.hourly.sea_surface_temperature[0];

document.getElementById("waveHeight").innerHTML=`${ola.toFixed(2)} m`;
document.getElementById("windSpeed").innerHTML=`${viento.toFixed(1)} km/h`;
document.getElementById("seaTemp").innerHTML=`${temperatura.toFixed(1)} °C`;

let indice=100;

/* Penalización por oleaje */

if(ola>3){
    indice-=60;
    }else if(ola>2){
        indice-=40;
    }else if(ola>1){
        indice-=20;
    }

/* Penalización por viento */

if(viento>45){
    indice-=50;
    }else if(viento>30){
        indice-=30;
    }else if(viento>15){
        indice-=15;
    }

/* Temperatura */

if(temperatura<18){
    indice-=5;
    }
    if(indice<0){
    indice=0;
    }

/*===========================*/

const barra=document.getElementById("progressFill");
barra.style.width=indice+"%";
document.getElementById("securityValue").innerHTML=indice+"%";

let estado="";
let recomendacion="";
let color="";

/*===========================*/

if(indice>=85){
    estado="🟢 OPERACIÓN NORMAL";
    recomendacion="Las condiciones marítimas son óptimas para realizar maniobras de ingreso, salida y atraque de embarcaciones.";
    color="#22c55e";
}

else if(indice>=65){

    estado="🟡 PRECAUCIÓN";
    recomendacion="Se recomienda disminuir la velocidad de ingreso y mantener monitoreo constante del estado del mar.";
    color="#eab308";

}

else if(indice>=40){

    estado="🟠 OPERACIÓN RESTRINGIDA";
    recomendacion="Las operaciones deben realizarse únicamente con autorización del personal portuario.";
    color="#f97316";

}

else{

    estado="🔴 PUERTO CERRADO";
    recomendacion="Las condiciones marítimas representan un riesgo elevado. Se recomienda suspender temporalmente las operaciones.";
    color="#ef4444";

}

/*===========================*/

barra.style.background=color;
document.getElementById("operationStatus").innerHTML=estado;
document.getElementById("operationStatus").style.color=color;
document.getElementById("recommendationText").innerHTML=recomendacion;
}catch(error){
console.error(error);
}

}
cargarEstadoPuerto();
/* Actualiza cada 5 minutos */
setInterval(cargarEstadoPuerto,300000);