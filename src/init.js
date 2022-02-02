/**
 * Aqui se inicializan los componentes
 */

 /* definicion de componentes */
import './js/libs.js';
//import './appVue/appvue.js';
//import './vanilla/vanilla.componentes.js';
import './js/config.js';

/* Inicialización de base de datos */
import './js/utils/db/db.js';

/*inicializacion de dragdrop en el escritorio */
import { drop, allowDrop } from './js/ventanas/dragdrop.js';

const desk = document.querySelector('.escritorio');
desk.addEventListener('drop', (e) => {drop(e);});
desk.addEventListener('dragover', (e) => {allowDrop(e);});

/* Redefinicion del alert */
import { Modal } from './js/utils/modal/modal.js';
import { addWindowConParametros } from './js/utils/ventana/agregarApps.js';

function alerta(texto) {
    let dlg = new Modal();
    dlg.titulo = 'Alerta';
    dlg.innerHtml = `
    <h2>Mensaje</h2>
    ${texto}
    `;
    dlg.open();
}

window._alert = window.alert;


window.alert = alerta;

//addWindowConParametros('x-info-ide', 'W3Studio - ide', {maximizar: "true"});
//addWindowConParametros('x-iframe', 'saúl SM', {maximizar: "true"}, {src: 'https://saulsalazarmendez.github.io/cv/#/'});
//addWindowConParametros('x-iframe', 'Try codding', {}, {src: 'https://saulsalazarmendez.github.io/ejemplos/try-coding'});
//addWindowConParametros('x-iframe', 'saúl SM', {maximizar: "true"}, {src: 'https://saulsalazarmendez.github.io/cv'});
//let div = addWindowConParametros('div', 'soundcloud');
//div.innerHTML = `<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1237245484&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-986906111" title=".saul." target="_blank" style="color: #cccccc; text-decoration: none;">.saul.</a> · <a href="https://soundcloud.com/user-986906111/sets/orquesta" title="orquesta" target="_blank" style="color: #cccccc; text-decoration: none;">orquesta</a></div>`;
