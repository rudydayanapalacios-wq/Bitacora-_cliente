import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const carpeta = path.join(import.meta.dirname, '..', 'data');
const ruta = path.join(carpeta, 'notas.json');

if (!fs.existsSync(carpeta)) {
    fs.mkdirSync(carpeta);
}

if (!fs.existsSync(ruta)) {
    fs.writeFileSync(ruta, '[]');
}

export function guardar(notas) {
    fs.writeFileSync(ruta, JSON.stringify(notas, null, 2));
}

export function leer() {
    try {
        return JSON.parse(fs.readFileSync(ruta, 'utf8'));
    } catch {
        console.log(`Error al leer las notas. Revisa el archivo notas.json.`);
        return [];
    }
}

export function registrar(comando, resultado) {
    const rutaLog = path.join(carpeta, 'bitacora.log');
    const fecha = new Date().toISOString();

    fs.appendFileSync(
        rutaLog,
        `${fecha} | ${comando} | ${resultado}\n`
    );
}


export function respaldar() {
    const carpetaRespaldos = path.join(import.meta.dirname, '..', 'respaldos');

    if (!fs.existsSync(carpetaRespaldos)) {
        fs.mkdirSync(carpetaRespaldos);
    }

    const fecha = new Date().toISOString().replace(/[:.]/g, '-');
    const destino = path.join(carpetaRespaldos, `notas_${fecha}.json`);

    fs.copyFileSync(ruta, destino);

    console.log(`Respaldo creado correctamente.`);
    return `Respaldo creado correctamente: ${destino}`;
}


export function exportar(carpetaDestino) {
    const carpetaSalida = path.join(import.meta.dirname, '..', 'salida');
    const rutaArchivo = path.join(carpetaSalida, 'exportacion.txt');

    if (!fs.existsSync(carpetaSalida)) {
        fs.mkdirSync(carpetaSalida);
    }

    const notas = leer();

    let contenido = '';

    notas.forEach(function(nota) {
        contenido += `ID: ${nota.id}\n`;
        contenido += `Texto: ${nota.texto}\n`;
        contenido += `Etiqueta: ${nota.etiqueta}\n`;
        contenido += `Fecha: ${nota.fecha}\n\n`;
    });

    fs.writeFileSync(rutaArchivo, contenido, 'utf8');

    if (!carpetaDestino) {
        carpetaDestino = os.homedir();
    }

    if (!path.isAbsolute(carpetaDestino)) {
        console.log(`La ruta de destino debe ser absoluta.`);
        return `Error: la ruta debe ser absoluta`;
    }

    if (!fs.existsSync(carpetaDestino) ||
        !fs.statSync(carpetaDestino).isDirectory()) {
        console.log(`La carpeta de destino no existe.`);
        return `Error: la carpeta de destino no existe`;
    }

    const destino = path.join(carpetaDestino, 'exportacion.txt');

    try {
        fs.renameSync(rutaArchivo, destino);
    } catch (error) {
        if (error.code === 'EXDEV') {
            fs.copyFileSync(rutaArchivo, destino);
            fs.unlinkSync(rutaArchivo);
        } else {
            throw error;
        }
    }

    console.log(`Exportación realizada correctamente.`);
    return `Exportación realizada correctamente: ${destino}`;
}