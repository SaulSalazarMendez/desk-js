import {Modal} from './modal.js';

export class ModalGet extends Modal {
    constructor(mensaje, valorDefault, tipo='text') {
        super();
        this._titulo = '';
        this.innerHtml = /*html*/`
        <div class="w3-container">
            <p>
            <label>${mensaje}</label>
            <input class="w3-input" type="${tipo}" value="${valorDefault}">
            </p>
        </div>
        `;
    }

    dataAceptar(){
        let input = this._el.querySelector('input');        
        return input.value; 
    }
}