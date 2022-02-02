import { getDB } from '../../utils/db/db.js';
import {llamaNyancat} from '../../utils/memes/nyancat.js';
import {config} from '../../config.js';
import { addWindowConParametros } from '../../utils/ventana/agregarApps.js';
import { getMusicPlayer } from '../../utils/html/music-playe.js';
const template = /*html*/`
<div class="terminal w3-black">    
    <div class="lineas">
    <div>
        <h1 class="">Consola js</h1>
        creado por <span class="w3-text-green">Saúl Salazar Méndez</span>
    </div>
    </div>
    <div>
        <div class="usuario w3-text-blue">></div>
        <input type="text" class="w3-black" style="font-family: monospace;">        
    </div>
</div>
`;
const estilo = /*css*/`
.usuario{
    float: left;
}
input{
    float: left;
    outline: none;
    border: none;
    width: 90%;    
}
.terminal{
    max-height: 100vh;
    height: 100vh;
    width: 100%;
    overflow: auto;
}
.resultado{
    padding-left: 50px;
    color: grey;
}
`;

class ConsolaJs extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        let shadownRoot = this.attachShadow({mode: 'open'});
        shadownRoot.innerHTML = `
            <link rel="stylesheet" href="${config.w3css}">
            <style>${estilo}</style>
            ${template}
        `;
        this.addListeners();
        this.v = {
            player: getMusicPlayer()
        };
    }

    addListeners() {
        const input = this.shadowRoot.querySelector('input');
        input.addEventListener('change', ev => { this.procesaComado(input.value); });
        const caso = this.shadowRoot.querySelector('.terminal');
        caso.addEventListener('click', ()=>{ input.focus();});
    }

    procesaComado(cmd, arreglado = false) {   
        if (this.procesaClear(cmd)) { return; }
        if (this.procesaNyancat(cmd)) { return; }
        if (this.procesaOpenApp(cmd)) { return; }
        this.agregarVariable(cmd);
        let resultado = '';        
        try {
            /*jslint evil: true */ 
            resultado = eval(cmd);
        } catch (error) {
            this.procesaError(cmd, arreglado);
            this.clearInput();
            return;
        }    
        if (!arreglado)  {
            this.createRespuesta(cmd, resultado);
        } else {
            return resultado;
        }
        this.clearInput();
    }

    procesaOpenApp(cmd) {
        let comandos = cmd.trim().split(' ');
        console.log(comandos);
        if (comandos[0].indexOf('openApp') >= 0) {
            if (!comandos[1]) { 
                this.createRespuesta(cmd, 'Necesita dar el nombre del componente que desea abrir.', false);
                this.clearInput();
                return true;
            }
            let app = addWindowConParametros(comandos[1], 'openApp '+comandos[1], {resize: null, maximizar: true});
            this.createRespuesta(cmd, '');
            this.clearInput();
            return true;
        }
        return false;
    }

    procesaClear(cmd) {
        if(cmd.indexOf('clear')>=0){
            this.clear();
            this.clearInput();
            return true;
        }
        return false;
    }

    procesaNyancat(cmd) {
        if (cmd.indexOf('nyancat') >= 0){ 
            llamaNyancat();
            this.createRespuesta(cmd, '');
            this.clearInput();
            return true; 
        }
        return false;
    }

    procesaError(cmd, arreglado) {
        let newCmd = this.replaceVaraibles(cmd);
        if (arreglado) {
            this.createRespuesta(cmd, 'No existe alguna variable o escribio mal', false);
            throw 'Error: no existe variable';            
        }
        try {
            let r = this.procesaComado(newCmd, true);
            this.createRespuesta(cmd, r);
        } catch (error) {
            
        }
    }

    createRespuesta(cmd, resultado, ok = true){
        let result = typeof resultado == 'object' ? 
            JSON.stringify(resultado, null, '\t') : resultado;
        let div = document.createElement('div');
        let estado = '<span class="w3-text-green">✓</span>';
        if(!ok) {
            estado = '<span class="w3-text-red">✗</span>';
        }        
        div.innerHTML = `
            <div class="comando">${estado} ${cmd}</div>
            <div class="resultado">${result}</div>
        `;
        let lineas = this.shadowRoot.querySelector('.lineas');
        lineas.appendChild(div);
    }

    clearInput() {
        let input = this.shadowRoot.querySelector('input');
        input.value = '';
    }

    clear() {
        let lineas = this.shadowRoot.querySelector('.lineas');
        lineas.innerHTML = '';
        this.clearInput();
    }    

    getArregloOperadores(cmd){
        let arr = [];
        let op = '';
        const letra = /[\w'" ]+/;
        for(let l of cmd) {
            if (letra.test(l)){
                op += l;
            } else {
                if (op != '') {
                    arr.push(op);
                    op = '';
                }
                arr.push(l);
            }
        }
        if (op != '') {
            arr.push(op);
            op = '';
        }
        return arr;
    }
    replaceVaraibles(cmd) {
        let arr = this.getArregloOperadores(cmd);        
        let keys = Object.keys(this.v);
        for(let i=0; i<arr.length; i++){ 
            let item = arr[i].trim();
            let esta = keys.find(key => {return key == item;});// jshint ignore:line
            if (esta != undefined) {
                arr[i] = 'this.v[\''+item+'\']';
            }
        }
        return arr.join('');
    }    

    agregarVariable(cmd) {
        let lineas = cmd.split(';');
        for(let linea of lineas) {
            if(linea.indexOf('let')>=0) {
                this.procesaVariables(linea);
            }
        }        
    }

    procesaVariables(cmd) {
        let declaracion = cmd.split('=');
        declaracion[0] = declaracion[0].replace('let', '').trim();
        declaracion[0] = declaracion[0].replace('let', '');
        /*jslint evil: true */
        eval('this.v[declaracion[0]] = '+declaracion[1]);        
    }

    replaceVariables(cmd) {

    }
}
customElements.define('x-consola-js', ConsolaJs);

