
import '../info/win.info.js';
import { Bloquear } from '../../utils/modal/bloquear.js';
import { addWindow } from '../../utils/ventana/agregarApps.js';
const template = /*html*/`
<div class="w3-dropdown-hover w3-left">    
    <button class="w3-button w3-black">Apps</button>
    <div :class="getClase(compacto)" style="z-index: 9999;">
       <menu-compacto 
            :apps="apps" 
            @bloquear="bloquear()" 
            @abrir="abrir($event)" 
            v-if="compacto"
            @expandir=" compacto = false;"></menu-compacto>
        <menu-expandido 
            :apps="apps" 
            @bloquear="bloquear()" 
            @abrir="abrir($event)" 
            v-if="!compacto"
            @expandir=" compacto = true;"></menu-expandido>
    </div>    
</div> 
`;

import MenuCompacto from './menu-compacto.js';
import MenuExpandido from './menu-expandido.js';

const apps = [
    {
        icono: 'https://openclipart.org/download/280995/RoughPipeWrench.svg',
        nombre: 'Utilidades',
        apps: [
            {
                componente: 'x-ayuda-escritorio',
                nombre: 'Ayuda escritorio',                
                icono: 'hand-peace-o',
                maximizar: true
            },
            {
                componente: 'x-calculadora',
                nombre: 'Calculadora',
                icono: 'calculator',
                resize: 0
            },
            {
                componente: 'x-consola-javascript',
                nombre: 'Consola',
                icono: 'terminal',
                maximizar: true
            },
            {
                componente: 'win-info',
                nombre: 'Sobre..',
                icono: 'info-circle'
            }
        ]
    },
    {
        icono: 'https://openclipart.org/download/169903/1336392323.svg',
        nombre: 'Configuraciones',
        apps: [{
            componente: 'config-desk',
            nombre: 'Escritorio',
            maximizar: true,
            icono: 'gear'
        }]
    }
];

const desk = document.querySelector('.escritorio');

let app = new Vue({
    el: '#menu-inicio',
    template: template,
    data: ()=>{
        return {
            apps: [],
            buscar: '',
            compacto: true
        };
    },
    components: {
        'menu-compacto': MenuCompacto,
        'menu-expandido': MenuExpandido
    },
    mounted() {
        this.apps = apps;
    },
    methods: {
        getClase(compacto){
            if (compacto){
                return 'w3-dropdown-content w3-card-4 menu-inicio-compacto';
            }
            return 'w3-dropdown-content w3-card-4 menu-inicio-expandido';
        },
        abrir(item){
            addWindow(item.componente, item.nombre, item.resize, item.maximizar);            
        },
        onbuscar(val) {
            let cad = val.target.value;
            if (cad == '') {
                return;
            }
            let keys = Object.keys(apps);
            this.apps = [];
            for(let key of keys){
                for(let app of apps[key]){
                    if (app.nombre.indexOf(cad)>=0) {
                        this.apps.push(app);
                    }
                }
            }
        },
        bloquear() {
            this.bloquea(false, 'admin');
        },
        bloquea(hasError, mensaje ) {
            let m = new Bloquear();
            m.open(hasError, mensaje).then(r => {
                if (r.data.password != 'admin'){
                    this.bloquea(true, 'Es admin');
                }
            });
        }
    }
});