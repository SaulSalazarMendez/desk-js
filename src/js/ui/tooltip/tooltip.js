import { config } from '../../config.js';

const style = /*css*/`
.tooltip {
    position: relative;
    display: inline-block;  
}

.tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;    
}

.arriba{
    bottom: 150%;
    left: 50%;
    margin-left: -60px;
}

.abajo {
    top: 150%;
    left: 50%;
    margin-left: -60px;
}

.derecha {
    top: -5px;
    left: 120%;
}

.izquierda {
    top: -5px;
    right: 120%;
}

  
.tooltip:hover .tooltiptext {
    visibility: visible;
}

`;

const template = /*html*/`
<div class="tooltip">
    <span id="titulo"><slot></slot></span>
    <span id="contenido" class="tooltiptext w3-small w3-border">
        contenido
    </span>
</div>
`;

export class ToolTip extends HTMLElement {
    constructor(){
        super();
        this.render();      
    } 
  
    render() {
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.w3css}">
            <link rel="stylesheet" href="${config.fontAwesome}">
            <style>${style}</style>
            ${template}
        `;
    }
    
    getIcono(menu) {
        if (menu.imagen) {
            return `
            <img src="${menu.imagen}" style="width: 115px;" class="w3-round w3-left w3-border">
            `;
        }
        return `        
            <div class="w3-center padding-cuadro">
                <i class="fa fa-${menu.icono} w3-xlarge"></i>
            </div>
        
        `;
    }

    connectedCallback() {        
        let contenido = this.getAttribute('contenido');        
        let posicion = this.getAttribute('posicion');        
        let contenidoSpan = this.shadowRoot.querySelector('#contenido');        
        if (contenido) {
            contenidoSpan.innerHTML = contenido;
        }
        if (posicion){
            contenidoSpan.classList.add(posicion);
        } else {
            contenidoSpan.classList.add('arriba');
        }
    }
}

customElements.define("x-tooltip", ToolTip); //Register the new element