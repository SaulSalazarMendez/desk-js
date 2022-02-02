import { config } from "../../config.js";
const template = /*html*/ `
<div class="w3-bar w3-color w3-border-top">
    <div class="w3-dropdown-hover w3-color">
        <span class="w3-button  w3-large"><i class="fa fa-bars"></i></span>
        <div class="w3-dropdown-content w3-bar-block w3-card-4" id="acciones">        
        </div>
    </div>
    <span class="w3-bar-item w3-large" id="titulo">
        <img class="bar-img" src="./img/icon/logo-app.png"> W3 Estudio - ide
    </span>
    <div class="w3-right w3-bar-item" style="display: none;" id="span-buscar">
        <i class="fa fa-search"></i>
        <input id="buscar">
    </div>
</div>
`;

const style = /*css*/`
.bar-img{
    width: 24px;
}
#buscar {
    transition: width 0.4s ease-in-out;
    font-size: small;
    width: 100px;    
}
#buscar:focus {
    width: 300px;
}
`;

class BarUI extends HTMLElement {
    constructor() {
        super();
        this.render();        
    }

    connectedCallback() {
        let color = this.getAttribute('color');
        if (color) {
            let divs = this.shadowRoot.querySelectorAll('.w3-color');            
            for(let div of divs){
                div.classList.value = div.classList.value.replace('w3-color', color);
            }
        }
        let buscar = this.hasAttribute('buscar');        
        if (buscar) {
            let div = this.shadowRoot.querySelector('#span-buscar');
            div.style.display = '';
        }
        const titulo = this.getAttribute('titulo');
        const icono = this.getAttribute('icono');
        if (titulo) {
            let barTitulo = this.shadowRoot.querySelector('#titulo');
            barTitulo.innerHTML = `<i class="fa fa-${icono}"></i> ${titulo}`;
        }
    }

    addListeners() {
        const buscar = this.shadowRoot.querySelector('#buscar');
        buscar.addEventListener('change', (ev) => {
            this.emiteBuscar(buscar.value);
        });
    }

    emiteBuscar(val) {
        this.dispatchEvent(
            new CustomEvent('buscar', {
                detail: {
                    buscar: true,
                    value: val
                }
            })
        );
    }

    getTitulo(menu) {
        if (menu.imagen) {
            return `<img class="bar-img" src="${menu.imagen}"> ${menu.titulo}`;
        }
        return `<i class="fa fa-${menu.icono}"></i> ${menu.titulo}`;
    }

    setItem(menu){
        let titulo = this.shadowRoot.querySelector('#titulo');
        let acciones = this.shadowRoot.querySelector('#acciones');
        titulo.innerHTML = this.getTitulo(menu);
        for(let accion of menu.acciones){            
            acciones.append(this.creaAccion(accion));            
        }        
    }

    creaAccion(accion) {
        let span = document.createElement('span');
        span.classList.value = 'w3-bar-item w3-button';
        span.innerHTML = `<i class="fa ${accion.icono}"></i> ${accion.titulo}`;
        span.addEventListener('click', ev => this.emiteOnAccion(accion));
        return span;
    }

    emiteOnAccion(accion) {
        this.dispatchEvent(
            new CustomEvent('accion', {
                detail: {
                    accionClick: true,
                    accion: accion
                }
            })
        );
    }

    render() {        
        let shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `
            <link rel="stylesheet" href="${config.w3css}">
            <link rel="stylesheet" href="${config.fontAwesome}">
            <style>${style}</style>
            ${template}
        `;
        this.addListeners();
    }
}

customElements.define('x-bar-menu' ,BarUI);