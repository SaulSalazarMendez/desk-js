import { configDesk, saveConfigDesk } from "../../config.js";

const template = /*html*/ `
<div>
    <x-bar-menu color="w3-blue-grey" 
        titulo="Configuración escritorio" icono="gear"></x-bar-menu>
    <h3>Configuración escritorio</h3>   
    <p>
    <input class="w3-radio" type="radio" name="tipo" value="color" v-model="tipo">
    <label>Color de fondo</label>
    <input class="w3-radio" type="radio" name="tipo" value="imagen" v-model="tipo">
    <label>Imagen</label>
    </p>
    <p v-if="tipo=='color'">
    Seleccione el color<br> 
    <input type="color" v-model="color" @change="cambioColor()">
    </p>
    <p v-if="tipo=='imagen'">
    Seleccione la imagen<br>
    <input class="w3-radio" type="radio" name="file" value="" v-model="file" @change="cambioImagen()">
    <label>Ninguno</label>
    <span v-for="(item,index) in listaImagenes" :key="index">
    <input class="w3-radio" type="radio" name="file" :value="item.valor" v-model="file" @change="cambioImagen()">
    <label>{{item.nombre}}</label>
    </span>    
    </p>
    <p>
    Color activo ventana<br>
    <input class="w3-radio" type="radio" name="colorActivo" value="w3-red" v-model="colorActivo" @change="cambioColorActivo()">    
    <label>Rojo</label>
    <input class="w3-radio" type="radio" name="colorActivo" value="w3-green" v-model="colorActivo" @change="cambioColorActivo()">    
    <label>Verde</label>
    <input class="w3-radio" type="radio" name="colorActivo" value="w3-blue" v-model="colorActivo" @change="cambioColorActivo()">
    <label>Azul</label>
    <input class="w3-radio" type="radio" name="colorActivo" value="w3-purple" v-model="colorActivo" @change="cambioColorActivo()">
    <label>Purpura</label>
    <input class="w3-radio" type="radio" name="colorActivo" value="w3-deep-orange" v-model="colorActivo" @change="cambioColorActivo()">
    <label>Naranja</label>
    <input class="w3-radio" type="radio" name="colorActivo" value="w3-brown" v-model="colorActivo" @change="cambioColorActivo()">
    <label>Café</label>
    <input class="w3-radio" type="radio" name="colorActivo" value="w3-pink" v-model="colorActivo" @change="cambioColorActivo()">
    <label>Rosa</label>
    <input class="w3-radio" type="radio" name="colorActivo" value="w3-teal" v-model="colorActivo" @change="cambioColorActivo()">
    <label>Teal</label>
    <input class="w3-radio" type="radio" name="colorActivo" value="w3-blue-grey" v-model="colorActivo" @change="cambioColorActivo()">
    <label>Gris</label>    
    </p>
    <p>
    Seleccione el tipo de ventana<br>
    <input class="w3-radio" type="radio" name="tipo-ventana" value="" v-model="tipoVentana" @change="cambioTipoVentana()">
    <label>W3CSS</label>
    <input class="w3-radio" type="radio" name="tipo-ventana" value="-98" v-model="tipoVentana" @change="cambioTipoVentana()">
    <label>98</label>
    <input class="w3-radio" type="radio" name="tipo-ventana" value="-xp" v-model="tipoVentana" @change="cambioTipoVentana()">
    <label>XP</label>
    <input class="w3-radio" type="radio" name="tipo-ventana" value="-mac" v-model="tipoVentana" @change="cambioTipoVentana()">
    <label>Mac</label>
    </p>
</div>
`;

const listaImagenes = [{
        nombre: 'Espacio',
        valor: 'libres/space'
    },{
        nombre: 'Tierra',
        valor: 'libres/tierra'
    },{
        nombre: 'Atardercer',
        valor: 'libres/atardercer-arbol'
    },{
        nombre: 'Café',
        valor: 'libres/cafe'
    },{
        nombre: 'Lago',
        valor: 'libres/lago'
    },{
        nombre: 'Libreta',
        valor: 'libres/libreta'
    },{
        nombre: 'Lobos',
        valor: 'libres/lobos'
    },{
        nombre: 'Mariposa',
        valor: 'libres/mariposa'
    },{
        nombre: 'Montaña',
        valor: 'libres/montaña'
    },
];

class ConfigDesk extends HTMLElement {
    constructor(){
        super();
        this.render();
    } 
  
    render() {
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `            
            <div></div>
        `;
        const div = shadowRoot.querySelector('div');
        const desk = document.querySelector('.escritorio');                
        let app = new Vue({
            el: div,
            data(){
                return {
                    tipo: null,
                    color: '',
                    colorActivo: '',
                    file: '' ,
                    tipoVentana: '',
                    listaImagenes: listaImagenes                   
                };
            },
            mounted(){                
                this.color = configDesk.colorDesk;                
                if (desk.style.backgroundImage && desk.style.backgroundImage.indexOf('url')>=0){
                    this.tipo = 'imagen';
                    let archivo = desk.style.backgroundImage
                        .replace('url("./img/', '').replace('.jpg")', '');                    
                    this.file = archivo;
                } else {
                    this.tipo = 'color';
                }
                this.colorActivo = configDesk.colorVentanaActiva;
                this.tipoVentana = configDesk.ventana;
            },
            template: template,
            methods: {
                tt(e){
                    console.log(e);
                },
                cambioColor() {
                    desk.style.background = this.color;
                    configDesk.colorDesk = this.color;
                    configDesk.imagenDesk = '';
                    saveConfigDesk();
                },
                cambioImagen() {
                    if (this.file!='') {
                        desk.style.backgroundImage = `url("./img/${this.file}.jpg")`;
                        configDesk.imagenDesk = `url("./img/${this.file}.jpg")`;
                        desk.style.backgroundRepeat = 'round';
                    } else {
                        desk.style.backgroundImage = ``;
                        configDesk.imagenDesk = '';
                        desk.style.backgroundRepeat = '';
                    }
                    saveConfigDesk();
                },
                cambioTipoVentana() {
                    configDesk.ventana = this.tipoVentana;
                    saveConfigDesk();
                },
                cambioColorActivo() {
                    configDesk.colorVentanaActiva = this.colorActivo;
                    saveConfigDesk();
                }
            }
        });
    }
}

customElements.define("config-desk", ConfigDesk); //Register the new element