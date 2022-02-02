import { configDesk } from "../../config.js";

/**
 * Crea una Ventana con el componente dado.
 * Se regresa una instancia del componente creado.
 * @param {string} componente nombre del componente
 * @param {string} titulo titulo de la ventana
 * @param {string} resize size {ancho: ?, alto: ?}, si es 0 no se puede cambiar tamaño.
 * @param {boolena} maximizar Estara maximizada
 */
export function addWindow(componente, titulo, resize, maximizar) {    
    return addWindowConParametros(componente, titulo, {resize: resize, maximizar: maximizar} );
}
/**
 * Crea una Ventana con el componente dado.
 * Se regresa una instancia del componente creado.
 * @param {string} componente nombre del componente
 * @param {string} titulo titulo de la ventana
 * @param {string} resize size {ancho: ?, alto: ?}, si es 0 no se puede cambiar tamaño.
 * @param {boolena} maximizar Estara maximizada
 */
export function addWindowConParametros(componente, titulo, parametrosWin = {}, parametrosApp = {}) {
    const desk = document.querySelector('.escritorio');
    let ventanaComp = 'x-window'+configDesk.ventana;    
    const win = document.createElement(ventanaComp);
    let app = document.createElement(componente);
    for ( let i in parametrosApp) {
        app.setAttribute(i, parametrosApp[i]);
    }
    win.appendChild(app);
    win.setAttribute('titulo', titulo);    
    desk.appendChild(win);
    for ( let i in parametrosWin) {
        if (parametrosWin[i] != null || parametrosWin[i] != undefined) {
            win.setAttribute(i, parametrosWin[i]);
        }
    }
    win.setAttribute('activo', 1);    
    win.setAttribute('size', JSON.stringify({ancho: 300, alto: 400}));    
    activaVentana(win);
    return app;
}
/**
 * Activa la siguiente ventana
 */
function activaVentana(win) {
    setTimeout(ev=> {
        win.activo = 1;        
    }, 50);
}