const style = /*css*/ `
.espacio{
    min-height: 10px;
}
/*define los estilos del componente*/
.hola-mundo{
    color: red;
}


.articulo-img{
    width: 100%;
    border-radius: 5px;
}

`;

const template = /*html*/ `

<div class="w3-bar w3-red">
<a href="#" class="w3-bar-item w3-button">Home</a>
<a href="#" class="w3-bar-item w3-button">Link 1</a>
<a href="#" class="w3-bar-item w3-button">Link 2</a>
<a href="#" class="w3-bar-item w3-button">Link 3</a>
</div>

<div class="
                w3-container w3-indigo w3-center titulo-jumbo
            ">

    <h1 class="w3-margin w3-jumbo">Ayuda</h1>
    <p class="w3-xlarge"><br></p>
</div><div class="w3-row titulo">

<div class="w3-col s2 espacio">        
</div>
<div class="w3-col s8">
    <h1 propiedades=""  style="font-family: fantasy;">Clases</h1>    
</div>
</div><div class="w3-row parrafo">

<div class="w3-col s2 espacio">        
</div>
<div class="w3-col s8">
    <div  propiedades="">Para editar las clases solo hay que dar clic debajo del titulo de clases, señalado en la imagen de color rojo.<div><br></div></div>
</div>
</div><div class="w3-row imagen">

<div class="w3-col s2 espacio">        
</div>
<div class="w3-col s8">
    <img src="./img/ayuda/propiedades/clases.png" class="articulo-img">
</div>
</div><div class="w3-row parrafo">

<div class="w3-col s2 espacio">        
</div>
<div class="w3-col s8">
    <div  propiedades=""><div><br></div>Puede agregar cualquier clase separada por un espacio en blanco. Puede usar las clases definidas en el editor, estas tomaran efecto inmediato en la vista.&nbsp;<div><br><div>O puede Usar las definidas en la librería de 
    <a href="https://www.w3schools.com/w3css/w3css_references.asp" target="_blank">W3CSS</a>.</div></div></div>
</div>
</div>
`;

class XAyudaPropiedadesClases extends HTMLElement {
    constructor() {
        super();
        this.nombreComponente = 'nice';

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
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
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
        let props = [];
        let salida = template + '';
        for (let p of props) {
            const exp = new RegExp(`{{${p}}}`, 'g');
            const attr = this.getAttribute(p);
            salida = salida.replace(exp, attr);
        }
        return salida;
    }



}

customElements.define("x-ayuda-propiedades-clases", XAyudaPropiedadesClases);