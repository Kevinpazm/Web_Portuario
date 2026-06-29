// ==========================================================================
// CONEXIÓN EN VIVO A LAS APIs LIBRES DE OPEN-METEO (SIN LÍMITES DIARIOS)
// ==========================================================================

// Coordenadas geográficas del Puerto de Manta, Ecuador
const LATITUD = "-0.9516";
const LONGITUD = "-80.7142";

async function consultarDatosMaritimos() {
    // URLs de Open-Meteo (Una para datos marítimos de olas y otra para viento/temperatura)
    const urlMarine = `https://marine-api.open-meteo.com/v1/marine?latitude=${LATITUD}&longitude=${LONGITUD}&current=wave_height&hourly=sea_surface_temperature`;
    const urlWeather = `https://api.open-meteo.com/v1/forecast?latitude=${LATITUD}&longitude=${LONGITUD}&current=wind_speed_10m`;

    try {
        // Ejecutamos ambas peticiones al mismo tiempo para ganar velocidad de carga
        const [resMarine, resWeather] = await Promise.all([
            fetch(urlMarine),
            fetch(urlWeather)
        ]);

        if (!resMarine.ok || !resWeather.ok) throw new Error("Error al conectar con los servidores meteorológicos");

        const datosMarine = await resMarine.json();
        const datosWeather = await resWeather.json();

        // 1. Extraemos la altura de las olas (Metros)
        const alturaOlas = datosMarine.current.wave_height;

        // 2. Extraemos la velocidad del viento (Viene en km/h por defecto)
        const velocidadViento = datosWeather.current.wind_speed_10m;

        // 3. Extraemos la temperatura de la superficie del mar (Tomamos el primer registro horario)
        const temperaturaMar = datosMarine.hourly.sea_surface_temperature[0];

        // Inyectamos los datos reales actualizados directamente en tu interfaz HTML
        document.getElementById("wave-height").innerText = `${alturaOlas.toFixed(2)} metros`;
        document.getElementById("wind-speed").innerText = `${velocidadViento.toFixed(1)} km/h`;
        document.getElementById("sea-temperature").innerText = `${temperaturaMar.toFixed(1)} °C`;

        // Modificamos el Badge para mostrar que la conexión está funcionando perfectamente en vivo
        const etiquetaAPI = document.querySelector(".api-status-badge");
        if (etiquetaAPI) {
            etiquetaAPI.innerText = "Satélite: Open-Meteo Live";
            etiquetaAPI.style.backgroundColor = "#f0fdfa"; 
            etiquetaAPI.style.color = "#14b8a6";
        }

        console.log("¡Métricas marítimas en vivo de Manta actualizadas exitosamente!");

    } catch (error) {
        console.error("Error en la sincronización de datos:", error);
        
        // Mecanismo de contingencia local por si falla la conexión general a internet
        document.getElementById("wave-height").innerText = "1.25 metros";
        document.getElementById("wind-speed").innerText = "15.4 km/h";
        document.getElementById("sea-temperature").innerText = "23.8 °C";

        const etiquetaAPI = document.querySelector(".api-status-badge");
        if (etiquetaAPI) {
            etiquetaAPI.innerText = "Modo de Contingencia Local";
            etiquetaAPI.style.backgroundColor = "#fffbeb"; 
            etiquetaAPI.style.color = "#d97706";
        }
    }
}

// Inicializa la carga de datos satelitales en cuanto la página esté lista
window.addEventListener("DOMContentLoaded", consultarDatosMaritimos);