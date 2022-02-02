import { getZindez } from "./zindexModal.js";

export class SplashScreen{
    constructor() {
        this._titulo = 'Titulo';
        this._el = null;
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
        div.style.height = "100hv";
        div.innerHTML = this.createWin();
        body.appendChild(div);

        return this.terminar(div);
        
    }

    dataAceptar(){
        return null;
    }
    
    terminar(div) {
        
        return new Promise((resolve,reject) => {            
            if(div) {
                div.addEventListener('click', (e)=>{                    
                    this._el.remove();
                    resolve({val: true, op:'aceptar'});
                });
                setTimeout(tik => {
                    this._el.remove();
                    resolve({val: true, op:'aceptar'});
                }, 3000);
            }            
        });
    }

    createWin() {
        return /*html*/`
        <div class="w3-row-padding">
            <div class="w3-col s3 m4" style="height: 100px;">
            </div>
            <div class="w3-col s11 m4 w3-text-white">        
                <div class="w3-card-4 animate__animated animate__jackInTheBox w3-display-container" id="ventana" 
                style="
                    width: 100%;                    
                    height: 250px;        
                    background: #69a62d;
                    margin-top: 30%;
                ">
                <!--<img class="w3-responsive" src="${this._srcimg}">-->
                    <div class="w3-display-topleft w3-container w3-padding-16">
                    <img class="w3-left" src="./img/icon/logo-app.png" style="width: 30px;"> 
                    <div class="w3-margin-left w3-large w3-left">W3 Estudio</div>
                    </div>
                    <div class="w3-display-middle w3-xxxlarge" style="font-family: fantasy;">${this._titulo}</div>
                    <div class="w3-display-bottomright w3-container">Creado por Saúl Salazar Méndez</div>                          
                </div>
            </div>
        </div>        
        `;
    }
}