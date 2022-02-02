import { config, configDesk } from "../config.js";

const style = /*css*/`

`;

const template = /*html*/
`
<div style="display: flex;">
        <div class="w3-button w3-blue w3-hover-grey w3-round">Purple</div>
        <div class="w3-button w3-grey w3-round">Purple</div>
</div>
`;
class Bandeja extends HTMLElement {
    constructor(){
        super();        
    } 
  
    render() {
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.w3css}">
            <link rel="stylesheet" href="${config.fontAwesome}">
            <style>${style}</style>
            ${template}
        `;
        this.addApps();
        this.observaDesk();
        this.observaSizeHtml();

    }
    /**
     * Observa los cambios de la ventana.
     */
    observaSizeHtml() {
        window.addEventListener('resize', this.emiteResizeVentanas.bind(this) );
    }
    /**
     * Emite el cambio a todas las ventanas.
     */
    emiteResizeVentanas() {
        const desk = document.querySelector('.escritorio');
        const ventanas = desk.querySelectorAll('x-window, x-window-98, x-window-xp, x-window-mac');        
        for(let win of ventanas) {
            win.emiteSize();
        }
    }

    addApps() {
        const desk = document.querySelector('.escritorio');
        const ventanas = desk.querySelectorAll('x-window, x-window-98, x-window-xp, x-window-mac');
        const div = this.shadowRoot.querySelector('div');
        div.innerHTML = '';
        for(let win of ventanas) {
            const titulo = win.getAttribute('titulo');
            const id = win.getAttribute('id');
            let color = 'w3-grey';
            if (win.getAttribute('activo') == 1 ) {
                color = configDesk.colorVentanaActiva;
            }
            div.innerHTML += `<div id="${id}" class="w3-button ${color} w3-round">${titulo}</div>`;
        }
        this.addListener();     
    }

    setActivo(id) {        
        this.removeActivo(id);
        let btn =  this.shadowRoot.querySelector('#'+id);
        if (!btn) return;
        btn.classList.remove('w3-grey');
        btn.classList.add(configDesk.colorVentanaActiva);
        btn.classList.add('w3-hover-indigo');
    }
    /**
     * Eventos para Windows
     * @param {KeyboardEvent} e 
     */
    listenerWindows(e) {
        if(e.metaKey && e.code == 'KeyA') {
            this.emiteAyudaEnVentanaActiva();
        }
        if(e.metaKey && e.code == 'KeyY') {
            this.activaSiguienteVentana();                
        }
        if(e.metaKey && e.code == 'KeyW') {
            this.cierraActiva();
        } 
        if(e.metaKey && e.code == 'KeyN') {
            this.emiteNuevoEnVentanaActiva();
        }
        if(e.metaKey && e.code == 'KeyG') {
            this.emiteGuardarEnVentanaActiva();
        }
        if(e.code == 'F2') {
            this.emiteEditarEnVentanaActiva();
        } 
    }

    /**
     * Eventos para Linux
     * @param {KeyboardEvent} e 
     */
    listenerLinux(e) {
        if(e.ctrlKey && e.altKey && e.code == 'KeyA') {
            this.emiteAyudaEnVentanaActiva();
        }
        if(e.ctrlKey && e.altKey && e.code == 'KeyY') {
            this.activaSiguienteVentana();                
        }
        if(e.ctrlKey && e.altKey && e.code == 'KeyW') {
            this.cierraActiva();
        } 
        if(e.ctrlKey && e.altKey && e.code == 'KeyN') {
            this.emiteNuevoEnVentanaActiva();
        }
        if(e.ctrlKey && e.altKey && e.code == 'KeyG') {
            this.emiteGuardarEnVentanaActiva();
        }
        if(e.code == 'F2') {
            this.emiteEditarEnVentanaActiva();
        } 
    }

    addListener() {
        let botones = this.shadowRoot.querySelectorAll('.w3-button');        
        for(let btn of botones) {
            btn.addEventListener('click',this.swapMinimize.bind(this));
        }
        const that = this;
        let plataforma = navigator.platform;
        document.onkeyup = function(e) {
            if (plataforma.indexOf('Windows')>=0) {
                that.listenerWindows(e);
            }
            if (plataforma.indexOf('Linux')>=0) {
                that.listenerLinux(e);
            }
        };
    }

    cierraActiva() {
        let win = this.getVentanaActiva();
        if (win) {            
            win.cierraVentana();
        }
    }

    getVentanaActiva() {
        let ventanas = document.querySelectorAll('x-window, x-window-98, x-window-xp');
        for(let win of ventanas) {
            if (win.getAttribute('activo') == 1) {                
                return win;
            }
        }
        return null;
    }

    emiteEditarEnVentanaActiva() {
        let win = this.getVentanaActiva();
        if (win) {
            win.emiteEditar();
        }
    }

    emiteGuardarEnVentanaActiva() {
        let win = this.getVentanaActiva();
        if (win) {
            win.emiteGuardar();
        }
    }

    emiteNuevoEnVentanaActiva() {
        let win = this.getVentanaActiva();
        if (win) {            
            win.emiteNuevo();
        }
    }

    emiteAyudaEnVentanaActiva() {
        let win = this.getVentanaActiva();
        if (win) {            
            win.emiteAyuda();
        }
    }

    activaSiguienteVentana(){
        let ventanas = document.querySelectorAll('x-window, x-window-98, x-window-xp');
        if (ventanas.length == 1) {
            ventanas[0].setAttribute('activo', 1);
            return;
        }
        let i = 0;
        const n = ventanas.length;
        for(let win of ventanas) {
            if (win.getAttribute('activo') == 1) {
                ventanas[(i+1)%n].setAttribute('activo', 1);
                return;
            }
            i++;
        }
        if (ventanas.length > 0) {
            ventanas[0].setAttribute('activo', 1);            
        }
    }

    removeActivo(id) {
        let botones = this.shadowRoot.querySelectorAll('.w3-button');        
        for(let btn of botones) {
            let win = document.querySelector('#'+btn.getAttribute('id'));            
            btn.classList.remove(configDesk.colorVentanaActiva);
            btn.classList.add('w3-grey');
            btn.classList.remove('w3-hover-indigo');
            if (win.id !== id) {
                win.setAttribute('activo', 0);
            }
        }
    }

    swapMinimize(ev) {                
        const id = ev.target.getAttribute('id');
        let win = document.querySelector('#'+id);        
        const activo = win.getAttribute('activo');
        if (activo != '1') {
            win.setAttribute('activo', 1);
            return;
        }
        this.removeActivo(win.id);
        if (win.classList.contains('animate__zoomOutDown')){
            win.classList.remove('animate__zoomOutDown');
            win.classList.add('animate__zoomInUp');
            win.setAttribute('activo', 1);
        } else {
            win.classList.remove('animate__zoomInUp');
            win.classList.add('animate__zoomOutDown');
        }
    }

    observaDesk() {     
        const obj = this;   
        const desk = document.querySelector('.escritorio');                
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                obj.addApps();
            });    
        });
        var config = { childList: true };
        observer.observe(desk, config);
    }

    connectedCallback(){
        this.render();
        //his.addListeners();
    }

    disconnectedCallback(){
        console.log("Unmounted!");
    }
}

customElements.define("x-bandeja", Bandeja);