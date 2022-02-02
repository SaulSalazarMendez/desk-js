import { Modal } from "./modal.js";
import { getZindez } from "./zindexModal.js";

export class Bloquear extends Modal{
    constructor() {
        super();
        this._aceptar = 'Entrar';
        this._el = null;
    }
    open(hasError, mensaje) {
        let div = document.createElement('div');
        let body = document.querySelector('body');
        this._el = div;

        const desk = document.querySelector('.escritorio');        
        div.style.backgroundImage = desk.style.backgroundImage;
        div.style.backgroundRepeat = desk.style.backgroundRepeat;        
        if (!div.style.backgroundImage || div.style.backgroundImage.indexOf('url') == -1){
            div.style.background = desk.style.background ? desk.style.background : 'teal';
        }
        div.style.zIndex = getZindez();
        div.style.position = "fixed";
        div.style.top = 0;
        div.style.left = 0;
        div.style.bottom = 0;
        div.style.width = "100%";
        div.style.height = "100hv";
        if (hasError){
            mensaje = `<span class="w3-text-orange">${mensaje}</span>`;
        }
        div.innerHTML = this.createWin(mensaje);
        let ventana = this._el.querySelector('#ventana');
        if (hasError) {
            ventana.classList.value = 'w3-card-4 w3-white animate__animated animate__wobble';
        } else {
            ventana.classList.value = 'w3-card-4 w3-white animate__animated animate__flipInY';
        }
        body.appendChild(div);
        const cerrar = div.querySelector('#close');
        const cancelar = div.querySelector('#cancelar');
        const aceptar = div.querySelector('#aceptar');
        return this.terminar(cerrar, cancelar, aceptar);
    }
    terminar(cerrar, cancelar, aceptar) {
        
        return new Promise((resolve,reject) => {            
            if(aceptar) {
                aceptar.addEventListener('click', (e)=>{
                    const data = this.dataAceptar();
                    let ventana = this._el.querySelector('#ventana');
                    ventana.classList.value = 'w3-card-4 w3-white animate__animated animate__flipOutY';
                    setTimeout(()=> {
                        this._el.remove();
                        resolve({val: true, op:'aceptar', data: data });
                    }, 1000);
                });
            }
            
        });
    }

    dataAceptar(){
        let input = this._el.querySelector('input');
        let data = {
            password: input.value
        };        
        return data;
    }

    createWin(mensaje) {
        return /*html*/`
        <div class="w3-card-4 w3-white" id="ventana" 
        style="
            width: 30%;
            margin-left: 35%;
            margin-right: 35%;
            margin-top: 15%;
        ">
        <div class="w3-container w3-center">
            <p>
            <img src="./img/img_avatar3.png" alt="Avatar" class="w3-circle" style="width: 100px;">
            </p>
            <br>
            <p>Usuario</p>
            <p>
            <input style="width: 100px;" value="" type="password">
            </p>
            <p>${mensaje}</p>
        </div>
        <div class="w3-container w3-center">            
            <button class="w3-button w3-border w3-hover-blue w3-margin" id="aceptar">${this._aceptar}</button>
            </div>
        </div>
        `;
    }
}