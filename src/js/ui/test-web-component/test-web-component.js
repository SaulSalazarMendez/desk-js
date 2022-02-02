import { config } from "../../config.js";
import { getListaDeComponentesUsuario } from "../../utils/componentes-registrados/lista-componentes-activos.js";
import { getDB } from "../../utils/db/db.js";
const style = `
    .pc, .pc-giro {
        width: 100%;
        height: 100%;
    }
    .tablet {
        width: 719px;
        height: 957px;
        margin-left: 82px;
        margin-top: 97px;
        border-style: solid;
        border-width: 4px;       
    }
    .telefono {        
        width: 339px;
        height: 598px;
        margin-top: 82px;
        margin-left: 38px;
        border-style: solid;
        border-width: 4px;
    }
    .tablet-giro{
        width: 955px;
        height: 715px;
        margin-top: 89px;
        margin-left: 98px;
        border-style: solid;
        border-width: 4px;
    }
    .telefono-giro {
        height: 338px;
        width: 614px;
        margin-top: 42px;
        margin-left: 84px;
        border-style: solid;
        border-width: 4px;    
    }    
    .dispostivo-telefono{
        width: 419px;
        height: 783px;
        margin: auto;
        background-image: url(./img/ide/contenedor/mobil.png);
    }
    .dispostivo-telefono-giro{
        height: 419px;
        width: 800px;
        margin: auto;
        background-image: url(./img/ide/contenedor/mobil-giro.png);
    }
    .dispostivo-tablet{
        width: 887px;
        height: 1160px;
        margin: auto;
        background-image: url(./img/ide/contenedor/tablet.png);
    }
    .dispostivo-tablet-giro{
        width: 1160px;
        height: 887px;
        margin: auto;
        background-image: url(./img/ide/contenedor/tablet-giro.png);
    }
    .dispostivo-pc-giro, .dispostivo-pc{
        width: 100%;
        height: 80vh;
        margin: auto;        
    }
`;
class TestW3WebComponent extends HTMLElement {
    constructor(){
        super();              
        this.render();
        this.addListeners();   
        this.db = getDB();   
    }

    render() {
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
        <link rel="stylesheet" href="${config.fontAwesome}">
        <link rel="stylesheet" href="${config.w3css}">
        <style>${style}</style>
        <div class="w3-bar w3-black ">
            <div class="w3-bar-item w3-hover-grey" id="telefono" title="Mobil"><i class="w3-large fa fa-mobile"></i></div>
            <div class="w3-bar-item w3-hover-grey" id="tablet" title="Tablet"><i class="w3-large fa fa-tablet"></i></div>
            <div class="w3-bar-item w3-hover-grey w3-white" id="pc" title="Escritorio"><i class="w3-large fa fa-desktop"></i></div>
            <div class="w3-bar-item w3-hover-grey" id="rotar" title="Rotar"><i class="w3-large fa fa-undo"></i></div>
        </div>
        <div style="overflow: auto;"> 
            <div class="dispostivo-pc" id="dispositivo">
                <iframe id="contenedor" class="pc">            
                </iframe>
            </div>
        </div>
        `;
    }

    removeActivo() {
        let items = this.shadowRoot.querySelectorAll('.w3-bar-item');
        for(let item of items) {
            item.classList.remove('w3-white');
        }
    }

    addListeners() {
        let telefono = this.shadowRoot.querySelector('#telefono');
        let tablet = this.shadowRoot.querySelector('#tablet');
        let pc = this.shadowRoot.querySelector('#pc');
        let rotar = this.shadowRoot.querySelector('#rotar');
        let icono = rotar.querySelector('i');
        telefono.addEventListener('click', ev => this.setClassIframe(icono, 'telefono', telefono));
        tablet.addEventListener('click', ev => this.setClassIframe(icono, 'tablet', tablet));
        pc.addEventListener('click', ev => this.setClassIframe(icono, 'pc', pc));
        rotar.addEventListener('click', ev => this.rotarContenido(icono));
    }
    /**
     * Rota los elementos
     * @param {HTMLElement} icono El boton de rotar
     */
    rotarContenido(icono) {        
        let iframe = this.shadowRoot.querySelector('#contenedor');
        let dispositivo = this.shadowRoot.querySelector('#dispositivo');
        if (icono.classList.contains('fa-rotate-90')) {
            icono.classList.remove('fa-rotate-90');
            iframe.classList.value = iframe.classList.value.replace('-giro', '');
            dispositivo.classList.value = dispositivo.classList.value.replace('-giro', '');
        } else {
            icono.classList.add('fa-rotate-90');
            iframe.classList.value = iframe.classList.value+'-giro';
            dispositivo.classList.value = dispositivo.classList.value+'-giro';
        }
        
    }
    /**
     * Agrega la clase al iframe y activa el boton
     * @param {HTMLElement} icono 
     * @param {string} clase 
     * @param {HTMLElement} div 
     */
    setClassIframe(icono, clase, div) {
        let giro = '';
        if (icono.classList.contains('fa-rotate-90')) {
            giro = '-giro';
        }
        let iframe = this.shadowRoot.querySelector('#contenedor');
        let dispositivo = this.shadowRoot.querySelector('#dispositivo');
        iframe.classList.value = clase+giro;
        dispositivo.classList.value = 'dispostivo-'+clase+giro;
        this.removeActivo();
        div.classList.add('w3-white');
    }

    getWebcomponentsUsuario() {
        return new Promise( (resolve,reject) => {
            let lista = getListaDeComponentesUsuario();
            this.db.list('componentes').then(lComponentes => {
                let componentes = [];                
                for(let tag of lista) {
                    let item = lComponentes.find(c => c.tag == tag);// jshint ignore:line
                    if (item){
                        componentes.push(item);
                    }
                }
                resolve(componentes);
            }).catch(e => {
                reject(e);
            });
        });
    }

    setCustomComponent(tag, codigo) {
        this.getWebcomponentsUsuario().then(lista => {
            let iframe = this.shadowRoot.querySelector('#contenedor');                      
            let codigoComponetes = '';
            let contadorComponentes = 1;
            for(let item of lista) {
                codigoComponetes += `function registraComponente${contadorComponentes}() {`;
                codigoComponetes += item.codigo;
                codigoComponetes += `}\n;    registraComponente${contadorComponentes}();\n`;
                contadorComponentes ++;
            }
            let html = `
            <html>     
            <head>
            <link rel="stylesheet" href="${config.w3css}">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            </head>   
            <body>
                <${tag}></${tag}>
            <script>
            ${codigoComponetes}
            ${codigo}            
            </script>
            </body>
            </html>
            `;        
            iframe.contentDocument.open();
            iframe.contentDocument.write(html);  
            iframe.contentDocument.close();
        });        
    }

    setEstilo(estilo) {
        const style = this.shadowRoot.querySelector('style');
        style.innerHTML = estilo;
    }
}

customElements.define('test-custom-w3-webcomponent', TestW3WebComponent);