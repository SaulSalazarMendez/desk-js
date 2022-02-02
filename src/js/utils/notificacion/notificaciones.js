/**
 * Define los tres tipos de notifiaciones
 */
export const NOTIFICACION = {
    ALERT: 'w3-red',
    SUCCESS: 'w3-green',
    WARNING: 'w3-yellow'
};
/**
 * Define el evento de cerrar para la notificación
 * @param {*} div 
 * @param {*} span 
 * @param {*} reloj 
 */
function addListenerCerrar(div, span, reloj) {
    span.addEventListener('click', ev => {
        clearInterval(reloj);
        div.remove();
    });
}
/**
 * Agrega ewl div contenedor de notificaciones
 */
function addNoticiaciones() {
    let div = document.createElement('div');
    div.id = 'notificaciones-de-la-app';
    div.style.cssText = 'position: fixed; bottom: 0; right: 20px; height: auto; z-index: 10000;';
    let body = document.querySelector('body');
    body.append(div);
    return div;
}
/**
 * Agrega una notifiacion, que se cerrara automaticamente.
 * Estas dependen de w3.css para los estilos.
 * @param {NOTIFICACION} tipo Definido por el tipo de NOTIFICACION
 * @param {string} titulo Titulo de la notificación
 * @param {string} mensaje Contenido de la notificación
 * @param {number} tiempo Tiempo en milisegundo
 */
export function addNotificacion(tipo, titulo, mensaje, tiempo = 5000) {
    let div = document.createElement('div');
    div.classList.value = `w3-panel w3-card-4 w3-display-container ${tipo}`;
    div.style.minWidth = '200px';
    div.innerHTML = `
        <span
            class="w3-button w3-green w3-large w3-display-topright">&times;</span>
        <h3>${titulo}</h3>
        <p>${mensaje}</p>
        <div class="w3-border w3-grey">
          <div class="w3-blue" style="height:5px;width:0" tiempo></div>
        </div>
        <br>
    `;
    let span = div.querySelector('span');    
    let barra = div.querySelector('[tiempo]');
    let contadorTiempo = 0;
    let reloj = setInterval((t) => {
        contadorTiempo += 10;
        if (contadorTiempo > tiempo) {
            clearInterval(reloj);
            div.remove();          
        } else {
            const ancho =  (contadorTiempo/tiempo)*100;
            barra.style.width = ancho + '%';            
        }
    }, 10);
    addListenerCerrar(div, span, reloj);
    let notificaciones = document.querySelector('#notificaciones-de-la-app');
    if (!notificaciones) {
        notificaciones = addNoticiaciones();
    }
    notificaciones.appendChild(div);
}