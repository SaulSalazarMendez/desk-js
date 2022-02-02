import { config } from "../../../config.js";

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
.bolita{
	width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #2196F3;
    transition: background 1s;
}
.bolita:hover{
	background: green;
}

`;

const template = /*html*/ `
<x-bar-menu color="w3-blue-grey" titulo="Ayuda escritorio" icono="hand-peace-o"></x-bar-menu>
<div class="w3-padding">
    <h2 class="margen-izq">Escritorio</h2>
</div>
<div class="w3-row">
    <div class="w3-col s2 espacio w3-hide-small"></div>

    <div class="w3-col s12 m8 ">
        <div class="w3-display-container w3-text-white">
            <img src="./img/ayuda/desk/desk.png" alt="Lights" style="width:100%" class="w3-card-4">
            <div class="w3-padding w3-display-bottomleft">
                <x-tooltip posicion="derecha" contenido="Menú de apps">
                    <div class="bolita animate__animated animate__heartBeat animate__infinite"></div>
                </x-tooltip>
            </div>
            <div class="w3-padding w3-display-bottomright">
                <x-tooltip posicion="izquierda" contenido="Reloj">
                    <div class="bolita animate__animated animate__heartBeat animate__infinite"></div>
                </x-tooltip>
            </div>    
            <div class="w3-padding w3-display-middle ">
                <x-tooltip posicion="abajo" contenido="Escritorio">
                    <div class="bolita animate__animated animate__heartBeat animate__infinite"></div>
                </x-tooltip>
            </div>
            <div class="w3-padding w3-display-bottommiddle">
                <x-tooltip contenido="Barra de tareas">
                    <div class="bolita animate__animated animate__heartBeat animate__infinite"></div>
                </x-tooltip>
            </div>
        </div>
    </div>
</div>
<div class="w3-row-padding titulo-h2">
<div class="w3-col s12" contenedor="">    
    <h2 propiedades=""  class="margen-izq">Teclas rápidas</h2>    
</div>
</div><div class="w3-row-padding parrafo w3-margin-top">

<div class="w3-col s12">
    <div  propiedades="" style="" class="margen-izq tamanio" id="">Estas combinaciones de teclas ejecutan funciones generales del escritorio web.</div>
</div>
</div><div class="w3-row w3-margin-top">


<div class="w3-col s2 espacio w3-hide-small">        
</div>

<div class="w3-col s12 m8 ">

<div class="w3-responsive">



<table class="w3-table-all">    
    <tbody><tr id="columnas" propiedades="">
        <th propiedades=""  style="min-width: 200px;">Atajo</th>
    <th id="1604244498232"><span propiedades="" >Acción</span> 
        </th></tr>
    <tr fila="">
        <td propiedades="" >Meta + w<br></td>
    <td  propiedades="">Cierra la ventana actual.</td></tr>
<tr fila=""><td propiedades="" >Meta + y</td><td propiedades="" >Activa la siguiente ventana.</td></tr>
<tr fila=""><td propiedades="" >Meta + a</td><td propiedades="" >Activa la ayuda de la ventana.</td></tr>
<tr fila=""><td propiedades="" >Meta + n</td><td propiedades="" >Emite el comando nuevo.<br>Nota: hay que dar la funcionalidad en las apps, escuchando de la ventana el evento <span style="font-style: italic;">"<span style="color: rgb(33, 150, 243);">nuevo</span>"</span>.</td></tr><tr fila=""><td propiedades="" >Meta + g</td><td propiedades="" >Emite el evento guardar. 
<br>Nota: hay que dar la funcionalidad en las apps, escuchando de la ventana el evento <span style="font-style: italic;">"<span style="color: rgb(33, 150, 243);">guardar</span>"</span>.</td></tr><tr fila=""><td propiedades="" >F2</td><td propiedades="" >Emite el evento editar. 
<br>Nota: hay que dar la funcionalidad en las apps, escuchando de la ventana el evento "<span style="color: rgb(33, 150, 243); font-style: italic;">editar</span>".</td></tr></tbody></table>
</div>

</div>

</div><div class="w3-row-padding comentario w3-margin-top">

<div class="w3-col s12">
    <blockquote class="w3-leftbar w3-pale-green w3-border-blue w3-padding margen-izq tamanio"  propiedades="" style="">
        <p><i class="fa fa-info w3-xxlarge w3-text-blue"></i></p>
        <p class="">La tecla meta es diferente dependiendo del teclado y el sistema operativo. Normalmente se representa en los teclados mediante la tecla ⊞ windows o&nbsp; ⌘ comand.</p>
    </blockquote>
</div>
</div>
`;
class XAyudaEscritorio extends HTMLElement {
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
            <link rel="stylesheet" href="${config.animate}">
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

customElements.define("x-ayuda-escritorio", XAyudaEscritorio);