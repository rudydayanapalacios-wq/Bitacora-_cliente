import { guardar, leer } from './almacen.js';
import hash from 'object-hash';

let notas = [];

export function agregar(texto, algoMas) {
    notas = leer();

    if (!texto || texto.trim() === '') {
        console.log(`Debes escribir el texto de la nota.`);
        return `Error: falta el texto de la nota`;
    }

    let id = hash(texto).substring(0, 8);

    let repetida = notas.find(function(nota) {
        return nota.texto === texto;
    });

    if (repetida) {
        console.log(`La nota ya existe. ID: ${repetida.id}`);
        return `Nota duplicada. ID: ${repetida.id}`;
    }

    notas.push({
        id: id,
        texto: texto,
        etiqueta: algoMas || 'general',
        fecha: Date.now()
    });

    guardar(notas);

    console.log(`Nota agregada. ID: ${id}`);
    return `Nota agregada. ID: ${id}`;
}

export function listar(cantidad) {
    notas = leer();

    if (notas.length === 0) {
        console.log(`No hay notas para mostrar.`);
        return `No hay notas para mostrar`;
    }

    if (!cantidad || isNaN(cantidad) || Number(cantidad) <= 0) {
        if (cantidad) {
            console.log(`Cantidad no válida. Se mostrarán las últimas 5 notas.`);
        }

        cantidad = 5;
    }

    notas = notas.slice(-Number(cantidad)).reverse();

    notas.forEach(function(nota) {
        console.log(`ID: ${nota.id}`);
        console.log(`Texto: ${nota.texto}`);
        console.log(`Etiqueta: ${nota.etiqueta}`);
        console.log(`Fecha: ${nota.fecha}`);
    });

    return `Se mostraron ${notas.length} notas`;
}

export function buscar(palabra) {
    notas = leer();

    if (!palabra) {
        console.log(`Escribe una palabra para buscar.`);
        return `Falta la palabra para buscar`;
    }

    let encontrada = false;

    notas.forEach(function(nota) {
        if (nota.texto.toLowerCase().includes(palabra.toLowerCase())) {
            console.log(`ID: ${nota.id}`);
            console.log(`Texto: ${nota.texto}`);
            encontrada = true;
        }
    });

    if (!encontrada) {
        console.log(`No se encontraron notas con esa palabra.`);
        return `No se encontraron notas con esa palabra`;
    }

    return `Búsqueda realizada: ${palabra}`;
}

export function borrar(id) {
    notas = leer();

    let existe = notas.find(function(nota) {
        return nota.id === id;
    });

    if (!existe) {
        console.log(`No existe una nota con el ID ${id}`);
        return `No existe una nota con el ID ${id}`;
    }

    notas = notas.filter(function(nota) {
        return nota.id !== id;
    });

    guardar(notas);

    console.log(`Nota borrada correctamente.`);
    return `Nota borrada correctamente`;
}