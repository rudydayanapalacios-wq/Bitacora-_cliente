import fs from 'node:fs';
import path from 'node:path';

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