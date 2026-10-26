import { agregar, listar, buscar, borrar } from './notas.js';
import { registrar,respaldar,exportar } from './almacen.js';

const args = process.argv.slice(2);
const comando = args[0];
const texto = args[1];
const algoMas = args[2];

if (comando === 'agregar') {
    const resultado = agregar(texto, algoMas);
    registrar(comando, resultado);
} else if (comando === 'listar') {
    const resultado = listar(texto);
    registrar(comando, resultado);
} else if (comando === 'buscar') {
    const resultado = buscar(texto);
    registrar(comando, resultado);
} else if (comando === 'borrar') {
    const resultado = borrar(texto);
    registrar(comando, resultado);
} else if (comando === 'ayuda' || !comando) {
    console.log(`Comandos disponibles:`);
    console.log(`agregar "texto" [etiqueta]`);
    console.log(`listar [cantidad]`);
    console.log(`buscar "palabra"`);
    console.log(`borrar "id"`);
    console.log(`ayuda`)
    } else if (comando === 'respaldar') {
    const resultado = respaldar();
    registrar(comando, resultado);
    } else if (comando === 'exportar') {
    const resultado = exportar(texto);
    registrar(comando, resultado);

    registrar(comando || 'ayuda', `Se mostró la ayuda`);
} else {
    console.log(`Comando no válido. Escribe "ayuda" para ver las opciones.`);
    registrar(comando, `Comando no válido`);
}