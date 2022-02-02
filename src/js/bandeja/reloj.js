import { Fecha } from "../utils/fecha/Fecha.js";
/**
 * Componente fecha
 */
class Reloj extends HTMLElement {
    constructor(){
        super();        
    }

    connectedCallback(){
        setInterval(() => {
            this.innerHTML = new Fecha().toTimeString();
        }, 1000);
    }
}

customElements.define("x-reloj", Reloj);