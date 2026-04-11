const axios = require("axios");

// ⚠️ Ignorar SSL (solo pruebas)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// 🔗 URL (elige la que necesites)
const URL = "https://www.proinversion.mx:2180/mb/fileNet/cargaArchivo";

// 🔐 AUTH
const AUTH = "Basic cndzcHJheGlzcDpQcjR4MXMjdTVS";

// 📦 PAYLOAD
const payload = {
    rqt: {
        idTramite: 356704,
        idProceso: 11251400,
        nombre: "0008 - IDENTIFICACION OFICIAL ANVERSO.jpg",
        base64: ""
    }
};

// 🧠 LOG
function log(msg) {
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] ${msg}`);
}

// 🚀 PETICIÓN
async function hacerPeticion(i) {
    try {
        log(`🟡 [${i}] Iniciando`);

        const response = await axios.post(URL, payload, {
            headers: {
                "Authorization": AUTH,
                "Content-Type": "application/json"
            },
            timeout: 60000
        });

        log(`🟢 [${i}] ${response.status} - ${JSON.stringify(response.data).substring(0, 100)}`);

    } catch (error) {
        if (error.response) {
            log(`🔴 [${i}] ERROR HTTP ${error.response.status}`);
        } else if (error.request) {
            log(`🔴 [${i}] SIN RESPUESTA`);
        } else {
            log(`🔴 [${i}] ERROR ${error.message}`);
        }
    }
}

// ⚡ EJECUCIÓN PARALELA (30 requests)
async function main() {
    log("🚀 Ejecutando 30 requests en paralelo...");

    const promises = [];

    for (let i = 1; i <= 30; i++) {
        promises.push(hacerPeticion(i));
    }

    await Promise.all(promises);

    log("✅ Todas las peticiones terminaron");
}

main();