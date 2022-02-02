export class Openfile{
    constructor(tipo='') {        
        this._el = null;
        this.tipo = tipo;
    }    
    open() {        
        if (this._el) {
            this._el.remove();
        }
        let div = document.createElement('div');
        let body = document.querySelector('body');
        this._el = div;
        div.innerHTML = this.createWin();           
        let input = div.querySelector('input');
        body.appendChild(div);        
        return new Promise((resolve,reject) => {            
            input.addEventListener('change', (ev) => {
                this.terminar(ev).then(data => {
                    resolve(data);
                });
            });        
            input.click();
        });        
    }
    
    terminar(ev) {        
        return new Promise((resolve,reject) => {
            var file = ev.target.files[0]; 
            var r = new FileReader();
            const that = this;
            r.onload = function(e) {                 
                resolve(e.target.result);
                that._el.remove();
                that._el = null;                              
            };
            r.readAsText(file);        
        });
    }

    getTipo() {
        if (this.tipo) {
            return `accept="${this.tipo}"`;
        }
        return '';
    }
    /**
     * Elimina el input del dom. Tiene que utilizarse con el destructor del componente
     */
    finaliza() {
        if (this._el) {
            this._el.remove();
            this._el = null;
        }
    }

    createWin() {
        return /*html*/`
        <input type="file" id="fileinput" style="display: none;" ${this.getTipo()}/>
        `;
    }
}