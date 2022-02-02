import { config } from '../../config.js';

const template = /*html*/`
<div>    
    <div class="w3-row">
        <div class="w3-col s8 m8" style="max-height: 100vh; overflow-y: auto; width: 65%; margin: 2px;">
        <h1 class="w3-xxlarge" id="titulo">Titulo</h1>
        <div class="file-container">            
        </div>
        </div>
        <div class="w3-col s4 m4" id="vistaPrevia" 
            style="overflow: auto; max-height: 100vh; height:100vh; width: 32%;"> 
        </div>
    </div>    
</div>
`;

const style=/*css*/`
.img_pag{
    width: 80px;
    height: 80px;
}

.file-container {
    display: flex;
    flex-wrap: wrap;    
}

.file-select {
    border: solid 1px #2196F3;
    border-radius: 5px;
    background: beige;
}
  
.file-container > div {
width: 90px;
margin: 5px;
text-align: center;
}
`;

class PaginadorFiles extends HTMLElement {
    constructor(){
        super();
        this.lista = [];
        //es un callback
        this.getTipoImagen = null;
        this.render();             
    }

    render(){        
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
        <link rel="stylesheet" href="${config.w3css}">
        <style>${style}</style>
        ${template}
        `;
        this.el = shadowRoot.querySelector('div');
        this.vistaPrevia = shadowRoot.querySelector('#vistaPrevia');
        this.fileContainer = shadowRoot.querySelector('.file-container');
        this.titulo = shadowRoot.querySelector('#titulo');
        this.titulo.innerHTML = this.getAttribute('titulo');
    }

    quitarSelecionado() {
        for (let item of this.fileContainer.children) {
            item.classList.remove('file-select');
        }
    }

    getImagen(item) {
        if (this.getTipoImagen) {
            return this.getTipoImagen(item);
        }
        return './img/icon/text-file-icon.svg';
    }

    addFile(item) {        
        let div = document.createElement('div');
        div.innerHTML = /*html*/`
            <img class="img_pag" src="${this.getImagen(item)}"><br>
            ${item.nombre}
        `;
        div.id = item.id;
        div.addEventListener('click',e => { 
            this.quitarSelecionado();            
            this.vistaPrevia.innerHTML = `            
            <${this.getAttribute('vista-previa')}></${this.getAttribute('vista-previa')}>`;
            const vista = this.vistaPrevia.querySelector(this.getAttribute('vista-previa'));
            div.classList.add('file-select');
            this.emiteOnVistaPrevia(item, vista);
        });
        div.addEventListener('dblclick',e => {              
            this.emiteOpenItem(item);
        });
        this.fileContainer.appendChild(div);
    }

    emiteOnVistaPrevia(item, vistaPrevia) {
        this.dispatchEvent(
            new CustomEvent('onVistaPrevia', {
                detail: {
                    item: item,
                    vistaPrevia: vistaPrevia
                }
            })
        );
    }

    setLista(lista){
        this.fileContainer.innerHTML = '';
        this.lista = lista;
        for(let item of lista) {
            this.addFile(item);
        }        
    }

    setGetTipoImagen(getTipoImagen) {
        this.getTipoImagen = getTipoImagen;
    }

    emiteOpenItem(item) {
        this.dispatchEvent(
            new CustomEvent('onOpenItem', {
                detail: {
                    item: item
                }
            })
        );
    }
}

customElements.define('x-paginador-files', PaginadorFiles);