import { config, configDesk } from "../config.js";
import { getZindex, getId, Ventana } from "./ventana.js";

const style = /*css*/`
.ventana {
    position: absolute;  
}
.resizable {  
    position: absolute;
    right: 3px;
    bottom: 1px;
    color: black;
    font-size: xx-small;
    cursor: se-resize;
  }
.ventana_no_activa {
    filter: grayscale(1);
}

.w3-red {
    background: linear-gradient(90deg,#69221d,#f44336);
}
.w3-green {
    background: linear-gradient(90deg,#1a521c,#4CAF50);
}
.w3-blue {
    background: linear-gradient(90deg,navy,#1084d0);
}
.w3-purple {
    background: linear-gradient(90deg,#522252,purple)
}
.w3-deep-orange {
    background: linear-gradient(90deg,#8a3014,#ff5722);
}
.w3-brown {
    background: linear-gradient(90deg,#48352e,#795548);
}
.w3-pink {
    background: linear-gradient(90deg,#670f2d,#e91e63);
}
.w3-teal {
    background: linear-gradient(90deg,#1f6760,#009688);
}
.w3-blue-grey {
    background: linear-gradient(90deg,#556871,#607d8b);
}
.ventana-body{
    width: 100%;
}
`;

const template = /*html*/
`
<div class="content-win animate__animated">
    <div class="window ventana" id="ventana" draggable="true">
        <div class="title-bar" id="barra-titulo">
            <div class="title-bar-text" id="titulo">titulo</div>
            <div class="title-bar-controls">
            <button aria-label="Minimize" id="minimizar"></button>
            <button aria-label="Maximize" id="maximizar"></button>
            <button aria-label="Close"id="close"></button>
            </div>
        </div>
        <div class="window-body ventana-contenedor" style="margin: 0;">
            <div class="ventana-body">
                <slot></slot>
            </div>        
        </div>
    </div>        
    <div class='resizable' draggable="true" id="banda">//</div>        
</div>
`;

let x = 10; 
let y = 10;

export class Ventana98 extends Ventana {
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
            <link rel="stylesheet" href="${config.win98}">
            <link rel="stylesheet" href="${config.w3css}">
            <style>${style}</style>
            ${template}            
        `;
        this.classList.add('animate__animated');
        this.style.width = "500px";
        this.style.height = "200px";
        this.style.position = "absolute";
        this.style.zIndex = ""+(getZindex());
        this.style.left = x + 'px';
        this.style.top = y + 'px';
        x+= 10;
        y+= 10;
        this.setAttribute('id', 'win_'+getId());
        this.style.display = 'none'; 
        //se utilizara antes de cerrarce        
        this.beforeClose = null;         
    }
    /**
     * Se deja metodos para cambiar el ancho del body de la ventana
     * @param {*} ancho 
     * @param {*} alto 
     */
    setSizeVentana(ancho, alto) {
        if (!this.shadowRoot) {
            return;
        }
        const win = this.shadowRoot.querySelector('.content-win');
        const ventana = this.shadowRoot.querySelector('#ventana');
        const contenido = this.shadowRoot.querySelector('.window-body');
        this.setsize(this, ancho, alto);
        this.setsize(win, ancho, alto);
        this.setsize(ventana, ancho, alto);
        this.setsize(contenido, ancho, alto);
        const titulo = this.shadowRoot.querySelector('#titulo');
        titulo.style.width = `${ancho-150}px`;        
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
            body.style.overflow = 'auto';
            padre.classList.add('animate__headShake');
            padre.classList.remove('animate__rubberBand');            
        } else {
            this.actulizarePropiedaRestaurar(padre);
            this.actulizarePropiedaRestaurar(win);
            this.actulizarePropiedaRestaurar(ventana);
            let altura = this.pos.bodyMaxAltura;            
            if (this.pos.bodyMaxAltura == '') {
                altura = parseFloat(this.pos.alto)*0.78+'px';
            }
            body.style.maxHeight = altura;
            body.style.height = altura;
            body.style.width = this.pos.ancho;
            body.style.overflow = 'auto';
            padre.style.left = this.pos.x;
            padre.style.top = this.pos.y;
            padre.classList.add('animate__rubberBand');
            padre.classList.remove('animate__headShake');
        }        
    }

    set activo(val) {
        this._activo = val;        
        const m_activo = this.getAttribute('activo');
        if ((m_activo == 0 && val == 0) || (m_activo == null)) {
            return;
        }
        const barraTitulo = this.shadowRoot.querySelector('#barra-titulo');
        const ventana = this.shadowRoot.querySelector('#ventana');        
        this.style.zIndex = ""+getZindex();
        this.removeActivo(this.getAttribute('id'));      
        barraTitulo.classList.remove(configDesk.colorVentanaInactiva);
        barraTitulo.classList.add(configDesk.colorVentanaActiva);                
        this.setBandejaActivo(this.getAttribute('id'));        
        ventana.classList.remove('ventana_no_activa');
    }

    get activo() {        
        return super.activo();
    }    
}

customElements.define("x-window-98", Ventana98);