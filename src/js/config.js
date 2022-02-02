import { environments } from '../environments.js';
import { getBootswatchLocal, getBootswatchProduccion } from './utils/bootswatch/bootswatch-libs.js';
/**
 * Define las dependecias css de los webcomponentes. Si es produccion se ponen los cdn.
 */
let configuracion = {
    host: 'http://localhost/saul/lib',
    //host: 'http://saulsm.epizy.com/lib'
    colorVentanaActiva: 'w3-blue',
    colorVentanaInactiva: 'w3-grey',
    winxp: 'http://localhost/saul/lib/win/xp.css',
    win98: 'http://localhost/saul/lib/win/98.css',
    w3css: 'http://localhost/saul/lib/w3css/w3.css',
    fontAwesome: 'http://localhost/saul/lib/fonts/fafafont/font-awesome.min.css',
    animate: 'http://localhost/saul/lib/css/animate.min.css',    
    bootstrap: getBootswatchLocal(),    
};

if (environments.modo == 'produccion') {
    configuracion = {
        host: 'Git hub',        
        colorVentanaActiva: 'w3-blue',
        colorVentanaInactiva: 'w3-grey',
        winxp: 'https://unpkg.com/xp.css@0.2.4/dist/XP.css',
        win98: 'https://unpkg.com/98.css@0.1.17/dist/98.css ',
        w3css: 'https://www.w3schools.com/w3css/4/w3.css',
        fontAwesome: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
        animate: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',        
        bootstrap: getBootswatchProduccion(),        
    };
}

export const config = configuracion;


function loadConfigDesk() {
    const desk = document.querySelector('.escritorio'); 
    let item = localStorage.getItem('configDesk');
    let json = null;
    if (item) {
        json = JSON.parse(item);
    } else {
        json = {
            colorVentanaActiva: 'w3-blue',
            colorVentanaInactiva: 'w3-grey',    
            ventana: '',
            colorDesk: 'blue',
            imagenDesk: 'url("./img/libres/montaña.jpg")'
        };
    }
    desk.style.background = json.colorDesk;
    if (json.imagenDesk) {
        desk.style.backgroundImage = json.imagenDesk;
        desk.style.backgroundRepeat = 'round';        
    }    
    return json;
}

export let configDesk = loadConfigDesk();

export function saveConfigDesk() {
    localStorage.setItem('configDesk', JSON.stringify(configDesk));
}