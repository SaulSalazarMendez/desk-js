import { config, configDesk } from '../config.js';
import {Ventana98} from './ventana-98.js';
import { getId, getZindex } from './ventana.js';

const style = /*css*/`
.ventana {
    position: absolute;  
}
.resizable {  
    position: absolute;
    right: 4px;
    bottom: 2px;
    color: black;
    font-size: xx-small;
    cursor: se-resize;
  }
.ventana_no_activa {
    filter: grayscale(1);
}
.win-no-activa {
    box-shadow: 
        inset -1px -1px grey, 
        inset 1px 1px grey, 
        inset -2px -2px grey, 
        inset 2px 2px grey, 
        inset -3px -3px grey, 
        inset 3px 3px grey;    
}
.w3-red {
    background: #f44336;
    border-top: 1px solid #f44336;
    border-left: 1px solid #f44336;
    border-right: 1px solid #f44336;

}
.win-red{
    box-shadow: 
        inset -1px -1px #f44336, 
        inset 1px 1px #f44336, 
        inset -2px -2px #f44336, 
        inset 2px 2px #f44336, 
        inset -3px -3px #f44336, 
        inset 3px 3px #f44336;
}
.w3-green {    
    background: #4CAF50;
    border-top: 1px solid #4CAF50;
    border-left: 1px solid #4CAF50;
    border-right: 1px solid #4CAF50;
}
.win-green{
    box-shadow: 
        inset -1px -1px #4CAF50, 
        inset 1px 1px #4CAF50, 
        inset -2px -2px #4CAF50, 
        inset 2px 2px #4CAF50, 
        inset -3px -3px #4CAF50, 
        inset 3px 3px #4CAF50;
}
.w3-blue {
    background: linear-gradient(180deg,#0997ff,#0053ee 8%,#0050ee 40%,#06f 88%,#06f 93%,#005bff 95%,#003dd7 96%,#003dd7);
    border-top: 1px solid #0831d9;
    border-left: 1px solid #0831d9;
    border-right: 1px solid #001ea0;
}
.win-blue {
    box-shadow: 
        inset -1px -1px #00138c, 
        inset 1px 1px #0831d9, 
        inset -2px -2px #001ea0, 
        inset 2px 2px #166aee, 
        inset -3px -3px #003bda, 
        inset 3px 3px #0855dd;
}
.w3-purple {
    background: purple;
    border-top: 1px solid purple;
    border-left: 1px solid purple;
    border-right: 1px solid purple;
}
.win-purple {
    box-shadow: 
        inset -1px -1px purple, 
        inset 1px 1px purple, 
        inset -2px -2px purple, 
        inset 2px 2px purple, 
        inset -3px -3px purple, 
        inset 3px 3px purple;
}
.w3-deep-orange {    
    background: #ff5722;
    border-top: 1px solid #ff5722;
    border-left: 1px solid #ff5722;
    border-right: 1px solid #ff5722;
}
.win-deep-orange {
    box-shadow: 
        inset -1px -1px #ff5722, 
        inset 1px 1px #ff5722, 
        inset -2px -2px #ff5722, 
        inset 2px 2px #ff5722, 
        inset -3px -3px #ff5722, 
        inset 3px 3px #ff5722;
}
.win-purple {
    box-shadow: 
        inset -1px -1px purple, 
        inset 1px 1px purple, 
        inset -2px -2px purple, 
        inset 2px 2px purple, 
        inset -3px -3px purple, 
        inset 3px 3px purple;
}
.w3-brown {    
    background: #795548;
    border-top: 1px solid #795548;
    border-left: 1px solid #795548;
    border-right: 1px solid #795548;
}
.win-brown {
    box-shadow: 
        inset -1px -1px #795548, 
        inset 1px 1px #795548, 
        inset -2px -2px #795548, 
        inset 2px 2px #795548, 
        inset -3px -3px #795548, 
        inset 3px 3px #795548;
}
.w3-pink {    
    background: #e91e63;
    border-top: 1px solid #e91e63;
    border-left: 1px solid #e91e63;
    border-right: 1px solid #e91e63;
}
.win-pink {
    box-shadow: 
        inset -1px -1px #e91e63, 
        inset 1px 1px #e91e63, 
        inset -2px -2px #e91e63, 
        inset 2px 2px #e91e63, 
        inset -3px -3px #e91e63, 
        inset 3px 3px #e91e63;
}
.w3-teal {    
    background: #009688;
    border-top: 1px solid #009688;
    border-left: 1px solid #009688;
    border-right: 1px solid #009688;
}
.win-teal {
    box-shadow: 
        inset -1px -1px #009688, 
        inset 1px 1px #009688, 
        inset -2px -2px #009688, 
        inset 2px 2px #009688, 
        inset -3px -3px #009688, 
        inset 3px 3px #009688;
}
.w3-blue-grey {    
    background: #607d8b;
    border-top: 1px solid #607d8b;
    border-left: 1px solid #607d8b;
    border-right: 1px solid #607d8b;
}
.win-blue-grey {
    box-shadow: 
        inset -1px -1px #607d8b, 
        inset 1px 1px #607d8b, 
        inset -2px -2px #607d8b, 
        inset 2px 2px #607d8b, 
        inset -3px -3px #607d8b, 
        inset 3px 3px #607d8b;
}
.ventana-body{
    width: 100%;    
}
`;

const template = /*html*/
`
<div class="content-win animate__animated">
    <div class="window ventana win-no-activa" id="ventana" draggable="true">
        <div class="title-bar" id="barra-titulo">
            <div class="title-bar-text" id="titulo">titulo</div>
            <div class="title-bar-controls">
            <button aria-label="Minimize" id="minimizar"></button>
            <button aria-label="Maximize" id="maximizar"></button>
            <button aria-label="Close"id="close"></button>
            </div>
        </div>
        <div class="window-body ventana-contenedor" style="margin: 0; padding-left: 3px;">
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

class VentanaXp extends Ventana98 {
    constructor() {
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
            <link rel="stylesheet" href="${config.winxp}">
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
        ventana.classList.add(this.getClassWin());        
        this.setBandejaActivo(this.getAttribute('id'));        
        ventana.classList.remove('ventana_no_activa');
    }

    get activo() {        
        return super.activo();
    }

    getClassWin() {
        return 'win-'+configDesk.colorVentanaActiva.replace('w3-', '');
    }    
}

customElements.define("x-window-xp", VentanaXp);