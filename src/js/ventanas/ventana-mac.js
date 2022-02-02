import { config, configDesk } from "../config.js";
import { Ventana98 } from "./ventana-98.js";
import { getZindex, getId, Ventana } from "./ventana.js";

const style = /*css*/`
.ventana {
    position: absolute;  
}
.resizable {  
    position: absolute;
    right: 2px;
    bottom: 0px;
    color: black;
    font-size: xx-small;
    cursor: se-resize;
  }
.ventana_no_activa {    
    filter: grayscale(1);
}

.w3-red {
    color: black!important;
    background: linear-gradient(90deg,#ebebeb, #d5d5d5)!important;
}
.w3-green {
    color: black!important;
    background: linear-gradient(90deg,#ebebeb, #d5d5d5)!important;
}
.w3-blue {
    color: black!important;
    background: linear-gradient(90deg,#ebebeb, #d5d5d5)!important;
}
.w3-purple {
    color: black!important;
    background: linear-gradient(90deg,#ebebeb, #d5d5d5)!important;
}
.w3-deep-orange {
    color: black!important;
    background: linear-gradient(90deg,#ebebeb, #d5d5d5)!important;
}
.w3-brown {
    color: black!important;
    background: linear-gradient(90deg,#ebebeb, #d5d5d5)!important;
}
.w3-pink {
    color: black!important;
    background: linear-gradient(90deg,#ebebeb, #d5d5d5)!important;
}
.w3-teal {
    color: black!important;
    background: linear-gradient(90deg,#ebebeb, #d5d5d5)!important;
}
.w3-blue-grey {
    color: black!important;
    background: linear-gradient(90deg,#ebebeb, #d5d5d5)!important;
}
.ventana-body{
    width: 100%;
}

.buttons {
    margin-left: 8px;
    margin-top: 3px;
    float: left;
    line-height: 0px;
}

.buttons:hover a {
    visibility: visible;
}

.close {
    background: #ff5c5c;
    font-size: 9pt;
    width: 11px;
    height: 11px;
    border: 1px solid #e33e41;
    border-radius: 50%;
    display: inline-block;
}

.close div:before{    
    content: 'x';      
    float: left;
    padding-top: 4px;
    padding-left: 2px;
    visibility: hidden;
}

.close:hover div:before{    
    visibility: visible;
}

.close:active {
    background: #c14645;
    border: 1px solid #b03537;
}

.minimize {
    background: #ffbd4c;
    font-size: 9pt;
    line-height: 11px;
    margin-left: 4px;
    width: 11px;
    height: 11px;
    border: 1px solid #e09e3e;
    border-radius: 50%;
    display: inline-block;
}

.minimize div:before{    
    content: '-';      
    float: left;    
    visibility: hidden;
}

.minimize:hover div:before{    
    visibility: visible;
}

.minimize:active {
    background: #c08e38;
    border: 1px solid #af7c33;
}

.zoom {
    background: #00ca56;
    font-size: 9pt;
    line-height: 11px;
    margin-left: 6px;
    width: 11px;
    height: 11px;
    border: 1px solid #14ae46;
    border-radius: 50%;
    display: inline-block;
}

.zoom div:before{    
    content: '+';      
    float: left;    
    visibility: hidden;
}

.zoom:hover div:before{    
    visibility: visible;
}

.zoom:active {
    background: #029740;
    border: 1px solid #128435;
}

.window {
    background: #f0f0f0;
    width: 50vw;
    height: 75vh;
    margin: auto;
    border: 1px solid #acacac;
    border-radius: 6px;    
}

.ventana-activa {
    box-shadow: 0px 0px 5px #acacac;
}
.title-bar {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    width: 100%;
    height: 24px;
}
`;

const template = /*html*/
`
<div class="content-win animate__animated">
    <div class="window ventana" id="ventana" draggable="true">
        <div class="title-bar" id="barra-titulo">
            <div class="buttons">
                <div class="close" id="close">
                    <div></div>          
                </div>
                <div class="minimize" id="minimizar">                    
                <div></div>
                </div>
                <div class="zoom" id="maximizar">                    
                <div></div>
                </div>
            </div>
            <div id="titulo" style="float: left; display: block; text-align: center; width: 213px">CSS OS X Yosemite Window</div>        
        </div>
        <div class="window-body ventana-contenedor">
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

export class VentanaMac extends Ventana98 {
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
        let titulo = this.shadowRoot.querySelector('#titulo');
        titulo.style.width = "430px";
        x+= 10;
        y+= 10;
        this.setAttribute('id', 'win_'+getId());
        this.style.display = 'none'; 
        //se utilizara antes de cerrarce        
        this.beforeClose = null;         
    }
    
    set activo(val) {
        super.activo = val;
        const m_activo = this.getAttribute('activo');
        if ((m_activo == 0 && val == 0) || (m_activo == null)) {
            return;
        }
        const ventana = this.shadowRoot.querySelector('#ventana');                
        ventana.classList.add('ventana-activa');        
        ventana.classList.remove('ventana_no_activa');      
    }

    get activo() {
        return super.activo;
    }

    getClassWin() {
        return 'win-'+configDesk.colorVentanaActiva.replace('w3-', '');
    }

    maximizar() {
        super.maximizar();
        const padre = this;
        const ancho = padre.style.width;
        const titulo = this.shadowRoot.querySelector('#titulo');
        titulo.style.width = `${padre.offsetWidth-70}px`;
    }

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
}

customElements.define("x-window-mac", VentanaMac);