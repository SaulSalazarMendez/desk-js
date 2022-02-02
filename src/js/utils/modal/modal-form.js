import {Modal} from './modal.js';
import { w3CodeColor } from '../colores/colores.js';

export class ModalForm extends Modal {
    constructor(titulo) {
        super();
        this._titulo = titulo;
        this.defaultValue = null;
        this.innerHtml = `
        <div class="w3-container">
            <p>
            Agrege los inputs con la propiedad dlg.innerHtml
            </p>
            <div class="w3-panel w3-card w3-light-grey"> 
            <h4>ejemplo</h4>
                <div class="w3-code jsHigh notranslate">
                    let dlg = new ModalForm();<br>
                    dlg.innerHtml = '
                    &lt;div class="w3-container"&gt;<br>

                    &lt;label&gt;First Name&lt;/label&gt;<br>
                    &lt;input class="w3-input" type="text" name="nombre" dato-salida&gt;<br>

                    &lt;label&gt;Last Namel&lt;/label&gt;<br>
                    &lt;input class="w3-input" type="text" name="apellido" dato-salida&gt;<br>

                    &lt;/div&gt;<br>
                    ' ;<br>
                    dlg.open().then(datos => {<br>
                        //datos = {nombre: .., apellido: ..}<br>
                    });<br>
                </div>
            </div>
            <p>
            Note que los inputs tienen la propiedad de name y dato-salida, es importante que estos 
            dos propiedades esten en los datos que desea recibir del dialogo.
            </p>
        </div>
        `;
    }

    dataAceptar(){
        let inputs = this._el.querySelectorAll('[dato-salida]');
        let data = {};
        for (let input of inputs){
            const name = input.getAttribute('name');            
            data[name] = input.value;
        }        
        return data; 
    }

    setDefaultValue(defaultValue) {
        this.defaultValue = defaultValue;
    }

    open() {
        let promesa = super.open();
        w3CodeColor(this._el);
        for(let key in this.defaultValue) {            
            let input = this._el.querySelector(`input[name="${key}"]`);            
            if (input) {
                input.value = this.defaultValue[key];
            }
        }
        return promesa;
    }
}
