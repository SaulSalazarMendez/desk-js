import { dragAMover, dragSize } from "./dragdrop.js";
import { config, configDesk } from "../config.js";

const style = /*css*/`
.ventana {
    position: absolute;  
}
.content-win{
    position: relative;
}
.resizable {  
    position: absolute;
    right: 1px;
    bottom: 1px;
    color: black;
    font-size: xx-small;
    cursor: se-resize;
  }
.ventana_no_activa {
    filter: grayscale(1);
}
.ventana-body {
    
}
`;

const template = /*html*/
`
<div class="content-win" style="width: 500px; height: 200px;">
    <div class="w3-card-4 w3-white ventana" id="ventana" style="width: 500px; height: 200px;" draggable="true">
        <div class="w3-bar ${configDesk.colorVentanaInactiva}" id="barra-titulo">
            <div class="w3-bar-item" id="titulo" 
            style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Titulo</div>
            <div class="w3-right">
                <span class="w3-button w3-black" id="close">x</span>
            </div>
            <div class="w3-right">
                <span class="w3-button w3-black" id="minimizar">-</span>
            </div>            
            <div class="w3-right">
                <span class="w3-button w3-black" id="maximizar">+</span>
            </div>
        </div>
        <div class="ventana-contenedor" style="overflow: auto; max-height: 143px;">
            <div class="ventana-body">
                <slot></slot>
            </div>               
        </div>       
    </div>        
    <div class='w3-right resizable' id="banda" draggable="true">//</div>         
</div>
`;
let zindez = 1000;
export function getZindex() {
    return zindez ++;
}
let id = 1;
export function getId() {
    return id++;
}
let x = 10; 
let y = 10;

export class Ventana extends HTMLElement {
    constructor(){
        super();        
    } 
  
    render() {
        this.pos = {
            x: '',
            y: '',
            ancho: '',
            alto: '',
            bodyMaxAltura: '',
            bodyAltura: ''
        };
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.w3css}">
            <link rel="stylesheet" href="${config.fontAwesome}">
            <style>${style}</style>
            ${template}            
        `;
        this.classList.add('animate__animated');
        this.style.width = "500px";
        this.style.height = "200px";
        this.style.position = "absolute";
        this.style.zIndex = ""+(zindez++);
        this.style.left = x + 'px';
        this.style.top = y + 'px';
        x+= 10;
        y+= 10;
        this.setAttribute('id', 'win_'+id++);
        this.style.display = 'none'; 
        //se utilizara antes de cerrarce
        this.beforeClose = null;         
    }

    setBeforeClose(callBack) {
        this.beforeClose = callBack;
    }

    connectedCallback(){
        this.render();
        this.addListeners();
        if (this.getAttribute('maximizar')) {                      
            this.maximizar();
        }
        this.style.display = 'block';
        this.setColorFondo();
        this.emiteCargado();
    }

    setColorFondo() {
        let color = this.getAttribute('color-fondo');        
        let win = this.shadowRoot.querySelector('.ventana-contenedor');
        if (color) {
            win.style.background = color;
        }
    }

    addListeners() {
        const win = this.shadowRoot.querySelector('#ventana');
        const banda = this.shadowRoot.querySelector('#banda');
        const close = this.shadowRoot.querySelector('#close');
        const minimizar = this.shadowRoot.querySelector('#minimizar');
        const maximizar = this.shadowRoot.querySelector('#maximizar');
        banda.addEventListener('dragstart', (e) => {
            dragSize(e, this);
        });
        win.addEventListener('dragstart', (e)=>{                        
            let slot = this.shadowRoot.querySelector('slot');
            slot.style.display = 'none';
            dragAMover(e, this);            
        });
        win.addEventListener('dragend', (e)=>{                        
            let slot = this.shadowRoot.querySelector('slot');
            slot.style.display = '';                       
        });
        close.addEventListener('click', (e)=> {
            this.cierraVentana();
        });
        minimizar.addEventListener('click', (e)=> {
            this.classList.add('animate__zoomOutDown');
        });
        maximizar.addEventListener('click', (e)=> {
            this.maximizar();
        });
        win.addEventListener('click', (e) => {                      
            this.setAttribute('activo', 1);            
        });
    }

    cierraVentana(){
        if (this.beforeClose) {
            if (this.beforeClose()) {
                this.parentNode.removeChild(this);                
            } else {
                console.log('No puedes cerrar');
            }
        } else {
            this.parentNode.removeChild(this);
        }
    }

    disconnectedCallback(){        
    }

    setsize(e, ancho, alto){
        e.style.width = `${ancho}px`;
        e.style.height = `${alto}px`;        
    }

    setSizeVentana(ancho, alto) {
        if (!this.shadowRoot) {
            return;
        }
        const win = this.shadowRoot.querySelector('.content-win');
        const ventana = this.shadowRoot.querySelector('#ventana');
        this.setsize(this, ancho, alto);
        this.setsize(win, ancho, alto);
        this.setsize(ventana, ancho, alto);
        const titulo = this.shadowRoot.querySelector('#titulo');
        titulo.style.width = `${ancho-150}px`;        
    }

    static get observedAttributes() {
        return ['titulo', 'activo', 'resize', 'size'];
    }

    get titulo() {
        return '';
    }

    set size(val) {
        let json = JSON.parse(val);
        if (!this.shadowRoot) {
            return;
        }        
        if (this.getAttribute('maximizar')) {                      
            this.maximizar();
        } else {
            this.setSizeVentana(json.ancho, json.alto);
            const contenedor = this.shadowRoot.querySelector('.ventana-contenedor');
            if (this.tagName !== 'X-WINDOW'){
                contenedor.style.width = (parseInt(this.style.width)-5) + 'px';
            }
            contenedor.style.maxHeight = (parseInt(this.style.height)-50) + 'px';
        }
        this.setColorFondo();
    }
    get size() {
        return '';
    }
      
    set titulo(value) {        
        setTimeout(()=>{
            const titulo = this.shadowRoot.querySelector('#titulo');
            titulo.innerHTML = value;
        }, 300);
    }

    set resize(value) {        
        if (value == 0) {
            const banda = this.shadowRoot.querySelector('#banda');
            banda.style.display = 'none';
        }
    }

    get resize() {
        return '';
    }

    set activo(val) {
        this._activo = val;        
        const m_activo = this.getAttribute('activo');
        if ((m_activo == 0 && val == 0) || (m_activo == null)) {
            return;
        }
        const barraTitulo = this.shadowRoot.querySelector('#barra-titulo');
        this.style.zIndex = ""+(zindez++);
        this.removeActivo(this.getAttribute('id'));      
        barraTitulo.classList.remove(configDesk.colorVentanaInactiva);  
        barraTitulo.classList.add(configDesk.colorVentanaActiva);        
        this.setBandejaActivo(this.getAttribute('id'));
        const ventana = this.shadowRoot.querySelector('#ventana'); 
        ventana.classList.remove('ventana_no_activa');
    }

    get activo() {
        return this._activo;
    }

    getClassWin() {
        return configDesk.colorVentanaActiva;
    }

    removeActivo(id) {
        let lista = document.querySelectorAll('x-window, x-window-98, x-window-xp, x-window-mac');
        for (let win of lista) {
            if (win.getAttribute('id') != id) {
                const barraTitulo = win.shadowRoot.querySelector('#barra-titulo');
                win.setAttribute('activo', 0);
                barraTitulo.classList.remove(configDesk.colorVentanaActiva);
                barraTitulo.classList.add(configDesk.colorVentanaInactiva);
                const ventana = win.shadowRoot.querySelector('#ventana');
                ventana.classList.remove(this.getClassWin());
                ventana.classList.add('ventana_no_activa')
            }
        }
    }

    setBandejaActivo(id) {
        const bandeja = document.querySelector('x-bandeja');        
        bandeja.setActivo(id);
    }
      
    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    maximizar() {
        const padre = this;
        const win = this.shadowRoot.querySelector('.content-win');
        const ventana = this.shadowRoot.querySelector('.ventana');
        const body = ventana.querySelector('.ventana-contenedor');        
        padre.classList.remove('animate__zoomInUp');
        
        if (padre.style.width !== "100%"){
            this.pos.x = padre.style.left;
            this.pos.y = padre.style.top;
            this.pos.ancho = padre.style.width;
            this.pos.alto = padre.style.height;
            this.pos.bodyAltura = body.style.height;
            this.pos.bodyMaxAltura = body.style.maxHeight;
            this.actualizaPropiedadMaximizar(padre);
            this.actualizaPropiedadMaximizar(win);
            this.actualizaPropiedadMaximizar(ventana);
            body.style.maxHeight = '';
            body.style.height = '89vh';
            body.style.width = '100%';
            padre.classList.add('animate__headShake');
            padre.classList.remove('animate__rubberBand');            
        } else {
            this.actulizarePropiedaRestaurar(padre);
            this.actulizarePropiedaRestaurar(win);
            this.actulizarePropiedaRestaurar(ventana);
            body.style.maxHeight = this.pos.bodyMaxAltura;
            body.style.height = this.pos.bodyAltura;
            padre.style.left = this.pos.x;
            padre.style.top = this.pos.y;
            padre.classList.add('animate__rubberBand');
            padre.classList.remove('animate__headShake');
        }        
    }

    actualizaPropiedadMaximizar(p) {
        p.style.top = "";
        p.style.left = "";
        p.style.width = "100%";
        p.style.height = "calc(100vh - 35px)";
    }

    actulizarePropiedaRestaurar(p) {
        p.style.width = this.pos.ancho;
        p.style.height = this.pos.alto;
    }

    emiteCargado() {
        this.dispatchEvent(
            new CustomEvent('cargado', {
                detail: {
                    cargado: true
                }
            })
        );
    }

    emiteAyuda() {
        this.dispatchEvent(
            new CustomEvent('ayuda', {
                detail: {
                    ayuda: true
                }
            })
        );
    }

    emiteNuevo() {
        //este metodo se llamara desde la bandeja cuando se presione meta+keyA
        this.dispatchEvent(
            new CustomEvent('nuevo', {
                detail: {
                    nuevo: true
                }
            })
        );
    }

    emiteGuardar() {
        //este metodo se llamara desde la bandeja cuando se presione meta+keyA
        this.dispatchEvent(
            new CustomEvent('guardar', {
                detail: {
                    guardar: true
                }
            })
        );
    }

    emiteEditar() {
        //este metodo se llamara desde la bandeja cuando se presione meta+keyA
        this.dispatchEvent(
            new CustomEvent('editar', {
                detail: {
                    editar: true
                }
            })
        );
    }
    /**
     * Emite el evento size. Es util cuando se cambia el tamaño de la ventana principal y
     * el conteneido de la ventana no se reestructura automaticamente.
     */
    emiteSize() {
        //este metodo se llamara desde la bandeja cuando se presione meta+keyA
        this.dispatchEvent(
            new CustomEvent('size', {
                detail: {
                    size: true
                }
            })
        );
    }
}

customElements.define("x-window", Ventana);