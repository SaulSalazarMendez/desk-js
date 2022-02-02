import { addWindow } from "../../utils/ventana/agregarApps.js";

const template = `
    <x-bar-menu color="w3-blue-grey" 
        titulo="Consola" icono="terminal"></x-bar-menu>
    <x-consola-js></x-consola-js>
`;


const style = ``;


class ConsolaJavaScript extends HTMLElement{
    constructor(){
        super();        
    }

    render() {
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `            
            ${template}
        `;        
        this.addListeners();
        let menu = shadowRoot.querySelector('x-bar-menu');
        menu.setItem({
            titulo: 'Consola',
            icono: 'terminal',
            acciones: [{
                titulo: 'Ayuda',
                icono: 'fa-hand-peace-o',
            }]
        });     
    }

    connectedCallback() {
        this.render();
    }

    addListeners() {
        let win = this.parentElement;
        win.addEventListener('ayuda', ev => {
            addWindow('x-ayuda-consola', 'Ayuda consola', null, 'true');
        });
        let menu = this.shadowRoot.querySelector('x-bar-menu');
        menu.addEventListener('accion', ev => {
            let data = ev.detail;
            if (data.accion.titulo == 'Ayuda') {
                addWindow('x-ayuda-consola', 'Ayuda consola', null, 'true');
            }
        });
    }
}

customElements.define('x-consola-javascript', ConsolaJavaScript);