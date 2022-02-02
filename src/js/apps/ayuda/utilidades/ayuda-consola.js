import { config } from "../../../config.js";

const template = `
<x-bar-menu color="w3-blue-grey" titulo="Ayuda consola" icono="hand-peace-o"></x-bar-menu>
<div>
<div class="w3-row-padding titulo-h1">

<div class="w3-col s12" contenedor="">    
    <h1 propiedades="" class="margen-izq">Comandos de la consola js</h1>    
</div>
</div><div class="w3-row-padding parrafo w3-margin-top">

<div class="w3-col s12">
    <div propiedades="" class="margen-izq">La consola ejecuta cualquier comando de javascrit.&nbsp;<div><br></div><div>Tenemos las siguientes instrucciones nos pueden ayudar.</div></div>
</div>
</div><div class="w3-row w3-margin-top">


<div class="w3-col s2 espacio w3-hide-small">        
</div>

<div class="w3-col s12 m8 ">

<div class="w3-responsive">



<table class="w3-table-all">    
    <tbody><tr id="columnas" propiedades="">
        <th propiedades="" style="width: 200px;">Comando</th>
    <th id="1604256152352"><span propiedades="">Accion</span> 
        </th></tr>
    <tr fila="">
        <td propiedades="">clear</td>
    <td propiedades="">Limpia la consola.</td></tr>
<tr fila=""><td propiedades="">nyancat</td><td propiedades="">Sorpresa..</td></tr></tbody></table>
</div>

</div>

</div>
</div>
`;

const style = /*css*/ `
* {
    background: ;
}
.espacio{
    min-height: 10px;
}
/*define los estilos del componente*/
.hola-mundo{
    color: red;
}

.margen-izq {
	margin-left: 16%;
}

.tamanio{
	width: 66%;
}


`;

class XAyudaConsola extends HTMLElement {
    constructor() {
        super();
        this.mensaje = 'Hola mundo';

        this.render();
        this.initComponentes();
        this.init();
    }

    initComponentes() {

    }
    init() {
        
    }


    render() {
        let shadowRoot = this.attachShadow({
            mode: 'open'
        });
        let customTemplate = this.replazaValoresMustache(template);
        shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.w3css}">
            <link rel="stylesheet" href="${config.fontAwesome}">
            <style>${style}</style>
            <div>${customTemplate}</div>
        `;
        this.$el = shadowRoot.querySelector('div');

    }
    /*Cuando se monta en la pagina*/
    connectedCallback() {}
    /*Cuando se desmonta en la pagina, no necesariamente se destruye*/
    disconnectedCallback() {}

    replazaValoresMustache(template) {
        let props = ['titulo', ];
        let salida = template + '';
        for (let p of props) {
            const exp = new RegExp(`{{${p}}}`, 'g');
            const attr = this.getAttribute(p);
            salida = salida.replace(exp, attr);
        }
        return salida;
    }



}

customElements.define("x-ayuda-consola", XAyudaConsola);