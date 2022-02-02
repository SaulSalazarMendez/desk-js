import { procesaArchivo } from "../utils/procesa-drop-archivo/procesa-archivo.js";

/**
 * Estrucura para mover una ventana en pantalla
 */
let itemAMover = {
    padre: null,
    target: null,
    x: 0,
    y: 0
};
/**
 * Estructura para mover el resize
 */
let itemSize = {
    padre: null,
    target: null,
    x: 0,
    y: 0
};

let tipo = '';
/**
 * Calcula el incremento de mivimiento
 * @param {number} ini 
 * @param {number} fin 
 */
function incremento(ini, fin) {
    return fin-ini;
}
/**
 * Parse a entero
 * @param {string} p 
 */
function numero(p) {
    if (p === '') return 0;
    return parseInt(p);
}
/**
 * Funcion para mover la ventana,
 * este se ejecuta cuando se suelta el elemento que se mueve
 * @param {Event} ev 
 */
export function dropMover(ev) {
    ev.preventDefault();    
    const x = incremento(itemAMover.x, ev.x);
    const y = incremento(itemAMover.y, ev.y);    
    itemAMover.padre.style.left = numero(itemAMover.padre.style.left) + x + 'px';
    itemAMover.padre.style.top = numero(itemAMover.padre.style.top) + y + 'px';    
} 
/**
 * Funcion para terminar de cambiar el size de la ventana.
 * En realidad se cambia el tamaño cuando se esta arrastrando
 * el item de size.
 * Se ejecuta termina de arrastrar.
 * @param {*} ev 
 */
export function dropSize(ev) {
    ev.preventDefault();    
    const x = incremento(itemSize.x, ev.x);
    const y = incremento(itemSize.y, ev.y);        
    const win = itemSize.target.parentNode;
    const padre = itemSize.padre;
    const ventana = win.querySelector('.ventana');
    const body = win.querySelector('.ventana-contenedor');
    const titulo = win.querySelector('#titulo');    
    let ancho = 0;
    let alto = 0;
    if (win.style.width == "" || win.style.width == "auto") {
        ancho = win.clientWidth;
    } else {
        ancho = numero(win.style.width);
    }
    if (win.style.height == "" || win.style.height == "auto") {
        alto = win.clientHeight;
    } else {
        alto = numero(win.style.height);
    }
    win.style.width = ancho + x + 'px';
    win.style.height = alto + y + 'px';
    padre.style.width = ancho + x + 'px';
    padre.style.height = alto + y + 'px';
    ventana.style.width = ancho + x + 'px';
    ventana.style.height = alto + y + 'px';
    body.style.maxHeight = alto + y - 50 + 'px';
    body.style.height = alto + y - 50 + 'px';
    body.style.width = (ancho + x) + 'px';
    if (padre.tagName !== 'X-WINDOW') {
        body.style.width = (ancho + x - 5) + 'px';
    }
    body.style.overflow = 'auto';
    titulo.style.width = `${ancho-150}px`;
    itemSize.x = ev.x;
    itemSize.y = ev.y;
}
/**
 * Funcion que se ejecuta cuando se termina de mover
 * un elemnto.
 * @param {Event} ev Del evento se obtiene el tipo de moviemnto y en base a este se llaman respectivas funciones.
 */
export function drop(ev) {
    const data = ev.dataTransfer.getData("tipo");    
    if (data == 'size') {        
        dropSize(ev);
    } else if (data == 'mover') {
        dropMover(ev);
    }
    if (ev.dataTransfer.items && ev.dataTransfer.items[0].kind === 'file') {
        ev.preventDefault();
        var file = ev.dataTransfer.items[0].getAsFile();
        procesaArchivo(file);
    }
    tipo = '';
}

/**
 * Funcion que se ejecuta al iniciar a arrastrar 
 * el item de size de la ventana
 * @param {Event} ev 
 * @param {HTMLElement} padre es el contenedor principal de la ventana
 */
export function dragSize(ev, padre) {              
    itemSize.target = ev.target;
    itemSize.x = ev.x;
    itemSize.y = ev.y;
    itemSize.padre = padre;
    ev.dataTransfer.setData("tipo", 'size');    
    tipo = 'size';
}
/**
 * Permite mover elementos
 * @param {*} ev 
 */
export function allowDrop(ev) {
    if (tipo == 'size') {        
        dropSize(ev);
    } else {
        ev.preventDefault();
    }    
    
}
/**
 * Funcion que se ejecuta al iniciar a arrastrar 
 * ela ventana
 * @param {Event} ev 
 * @param {HTMLElement} padre es el contenedor principal de la ventana
 */
export function dragAMover(ev, padre) {
    if (ev.target.tagName == 'APP-IDE'){
        return;
    }
    itemAMover.target = ev.target;
    itemAMover.x = ev.x;
    itemAMover.y = ev.y;
    itemAMover.padre = padre;
    ev.dataTransfer.setData("tipo", 'mover');
    tipo = 'mover';
}