import { getZindez } from "./zindexModal.js";

export class Modal{
    constructor() {
        this._innerHtml = 'Modal';
        this._titulo = 'Titulo';
        this._cancelar = 'Cancelar';
        this._aceptar = 'Aceptar';
        this._el = null;
    }
    set innerHtml(val) {
        this._innerHtml = val;
    }
    get innerHtml() {
        return this._innerHtml;
    }
    set cancelar(val) {
        this._cancelar = val;
    }
    get cancelar() {
        return this._cancelar;
    }
    set aceptar(val) {
        this._aceptar = val;
    }
    get aceptar() {
        return this._aceptar;
    }
    set titulo(val) {
        this._titulo = val;
    }
    get titulo() {
        return this._titulo;
    }
    open() {
        let div = document.createElement('div');
        let body = document.querySelector('body');
        this._el = div;

        div.style.zIndex = getZindez();
        div.style.background = "rgba(50,50,50,0.5)";
        div.style.position = "fixed";
        div.style.top = 0;
        div.style.left = 0;
        div.style.bottom = 0;
        div.style.width = "100%";
        div.style.height = "100vh";
        div.innerHTML = this.createWin();
        body.appendChild(div);
        const cerrar = div.querySelector('#close');
        const cancelar = div.querySelector('#cancelar');
        const aceptar = div.querySelector('#aceptar');
        aceptar.focus();
        return this.terminar(cerrar, cancelar, aceptar);
        
    }

    dataAceptar(){
        return null;
    }
    
    terminar(cerrar, cancelar, aceptar) {
        
        return new Promise((resolve,reject) => {
            if (cerrar){
                cerrar.addEventListener('click', (e)=>{
                    this._el.remove();
                    reject({val: false, op:'cerrar' });
                });
            }
            if (cancelar) {
                cancelar.addEventListener('click', (e)=>{
                    this._el.remove();
                    reject({val: false, op:'cancelar' });
                });
            }
            if(aceptar) {
                aceptar.addEventListener('click', (e)=>{
                    const data = this.dataAceptar();
                    this._el.remove();
                    resolve({val: true, op:'aceptar', data: data });
                });
            }
            
        });
    }

    createWin() {
        return /*html*/`
        <div class="w3-card-4 w3-white" id="ventana" 
        style="
            width: 50%;
            margin-left: 25%;
            margin-right: 25%;
            margin-top: 15%;
        ">
            <div class="w3-bar w3-blue" id="barra-titulo">
                <div class="w3-bar-item" id="titulo">${this._titulo}</div>
                <div class="w3-right">
                    <span class="w3-button w3-black" id="close">x</span>
                </div>
            </div>
            <div class="w3-container">
                <div class="ventana-body">
                    ${this._innerHtml}
                </div>               
            </div>
            <div class="w3-container">
                <button class="w3-button w3-border w3-hover-blue w3-right w3-margin" id="aceptar">${this._aceptar}</button>
                <button class="w3-button w3-border w3-hover-red w3-right w3-margin" id="cancelar">${this._cancelar}</button>
            </div>
        </div>
        `;
    }
}