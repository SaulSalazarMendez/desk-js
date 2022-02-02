import { config } from "../../config.js";
let idcalculadora = 0;
const template = /*html*/ `
<div @keyup="onkey" :tabindex="id" class="calc yolo">    
    <x-bar-menu color="w3-blue-grey" titulo="Calculadora" icono="calculator"></x-bar-menu>
    <div class="w3-row w3-margin">
        <div class="w3-col s12">
            <div class="margen w3-white w3-border">
            <div style="text-align: right;font-size: large;">{{getNumero()}}</div>
            <div style="font-size: xx-small;">
                <span v-if="operacion!=''">{{pila}}{{operacion}}</span>{{getNumero()}}
            </div>
            </div>
        </div>        
    </div>
    <div class="w3-row w3-margin">
        <div class="w3-col s3 w3-center"><span class="w3-deep-orange w3-border boton w3-hover-blue-grey" @click="onEliminaLetra()"><--</span></div>
        <div class="w3-col s3 w3-center"><span class="w3-deep-orange w3-border boton w3-hover-blue-grey" @click="reset()">Ce</span></div>
        <div class="w3-col s3 w3-center"><span class="w3-deep-orange w3-border boton w3-hover-blue-grey" @click="limpiaNumero()">C</span></div>
        <div class="w3-col s3 w3-center"><span class="w3-deep-orange w3-border boton w3-hover-blue-grey" @click="onOperacion('/')">/</span></div>
        <div class="w3-col s3 w3-center"><span class="w3-white w3-border boton w3-hover-blue-grey" @click="addNumero(7)">7</span></div>
        <div class="w3-col s3 w3-center"><span class="w3-white w3-border boton w3-hover-blue-grey" @click="addNumero(8)">8</span></div>
        <div class="w3-col s3 w3-center"><span class="w3-white w3-border boton w3-hover-blue-grey" @click="addNumero(9)">9</span></div>
        <div class="w3-col s3 w3-center"><span class="w3-deep-orange w3-border boton w3-hover-blue-grey" @click="onOperacion('*')">*</span></div>
        <div class="w3-col s3 w3-center"><span class="w3-white w3-border boton w3-hover-blue-grey" @click="addNumero(4)">4</span></div>
        <div class="w3-col s3 w3-center"><span class="w3-white w3-border boton w3-hover-blue-grey" @click="addNumero(5)">5</span></div>
        <div class="w3-col s3 w3-center"><span class="w3-white w3-border boton w3-hover-blue-grey" @click="addNumero(6)">6</span></div>
        <div class="w3-col s3 w3-center"><span class="w3-deep-orange w3-border boton w3-hover-blue-grey" @click="onOperacion('-')">-</span></div>
        <div class="w3-col s3 w3-center"><span class="w3-white w3-border boton w3-hover-blue-grey" @click="addNumero(1)">1</span></div>
        <div class="w3-col s3 w3-center"><span class="w3-white w3-border boton w3-hover-blue-grey" @click="addNumero(2)">2</span></div>
        <div class="w3-col s3 w3-center"><span class="w3-white w3-border boton w3-hover-blue-grey" @click="addNumero(3)">3</span></div>
        <div class="w3-col s3 w3-center"><span class="w3-deep-orange w3-border boton w3-hover-blue-grey" @click="onOperacion('+')">+</span></div>
        <div class="w3-col s6 w3-center"><span class="w3-white w3-border boton w3-hover-blue-grey" @click="addNumero(0)">0</span></div>
        <div class="w3-col s3 w3-center"><span class="w3-white w3-border boton w3-hover-blue-grey" @click="onPunto()">.</span></div>
        <div class="w3-col s3 w3-center"><span class="w3-deep-orange w3-border boton w3-hover-blue-grey" @click="onResultado()">=</span></div>        
    </div>
</div>
`;

const style=/*css*/`
.yolo {
    font-family: Verdana,sans-serif;
    font-size: 15px;
    line-height: 1.5;
    margin: 0;
}
.margen{
    margin: 2px;
    margin-bottom: 20px
}
.boton{
    cursor: pointer;
    display: block;
    margin: 2px;
    height: 30px;
}
.calc:focus { outline: none; }
`;
class Calculadora extends HTMLElement {
    constructor(){
        super();
        this.render();        
    } 
  
    render() {
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.w3css}">
            <link rel="stylesheet" href="${config.fontAwesome}">
            <style>${style}</style>            
            <div></div>            
        `;
        const div = shadowRoot.querySelector('div');
        const numeros = new Set(['0','1','2','3','4',
            '5','6', '7', '8', '9']);
        const operaciones = new Set(['/','*','-','+']);
        let app = new Vue({
            el: div,
            template: template,
            data() {
                return {
                    num1: '',
                    pila: '',
                    id: idcalculadora++,
                    punto: false,
                    operacion: ''                    
                };
            },            
            methods: {
                limpiaNumero() {
                    this.num1 = '';
                },
                reset() {
                    this.num1 = '';
                    this.pila = '';
                    this.punto = false;                    
                    this.operacion = '';
                },
                eliminaCerosInicio(cad){
                    let n = '';
                    let haynumero = false;
                    for(let i of cad){
                        if (i == '.') {
                            n += n == ''? '0.' : '.';
                        }else if (i!= '0' || haynumero) {
                            n += i;
                            haynumero = true;
                        }                        
                    }
                    if (n == '') n='0';
                    return n;
                },
                getNumero() {
                    return this.num1 != '' ? this.num1 : '0';
                },
                addNumero(n) {
                    if(this.num1.length > 10){
                        return;
                    }
                    this.num1 += ''+n;
                },
                onOperacion(p){
                    this.pila = this.eliminaCerosInicio(this.num1);
                    this.operacion = p;
                    this.num1 = '';
                    this.punto = false;  
                },
                onEliminaLetra() {
                    this.num1 = this.num1.substr(0, this.num1.length-1);
                },
                onkey(e){
                    if (e.key == 'Backspace') {
                       this.onEliminaLetra();
                    }
                    if (numeros.has(e.key)) {
                        this.addNumero(parseInt(e.key));
                    }
                    if (e.key == '.' && !this.punto) {
                        this.onPunto();
                    }
                    if (operaciones.has(e.key)) {
                        this.onOperacion(e.key);
                    }
                    if (e.key == 'Enter') {
                        this.onResultado();
                    }
                },
                onPunto(){
                    this.punto = true;
                    this.num1 += '.';
                },
                onResultado() {
                    this.num1 = this.num1 == '' ? '0' : this.num1;
                    if (this.operacion == '') return;
                    const op = '' + this.pila + this.operacion + 
                        this.eliminaCerosInicio(this.num1);    
                    /*jslint evil: true */                
                    this.num1 = '' + eval(op);
                    this.pila = '';
                    this.punto = false;                    
                    this.operacion = '';
                }
            }
        });
    }
}

customElements.define("x-calculadora", Calculadora); //Register the new element