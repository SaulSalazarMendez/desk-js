import { config } from "../../config.js";
import { getHitsCss } from "./listas-hints/lista-editor-css.js";
import { definicionesClaseBase } from "./listas-hints/lista-editor-js.js";

const style = /*css*/`
.principal {
    height: 100%;
    width: 100%;
}

.CodeMirror {
    font-family: monospace;
    height: 100%;  
    font-size: var(--size-font);
    direction: ltr;
}
`;

const styleVariable = /*css*/`
.variable {    
    --size-font: 12px;
}
`;

class xCodigo extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `           
            <link rel="stylesheet" href="${config.codeMirror.showhint}">
            <link rel="stylesheet" href="${config.codeMirror.main}">
            <link rel="stylesheet" href="${config.codeMirror.ambiance}">
            <link rel="stylesheet" href="${config.codeMirror.darcula}">
            <link rel="stylesheet" href="${config.codeMirror.material}">
            <link rel="stylesheet" href="${config.codeMirror.mbo}">
            <link rel="stylesheet" href="${config.codeMirror.neo}">
            <link rel="stylesheet" href="${config.codeMirror.solarized}">
            <link rel="stylesheet" href="./css/one-dark.css">
            <link rel="stylesheet" href="./css/vscode-dark.css">
            <link rel="stylesheet" href="${config.codeMirror.dialog}">                        
            <link rel="stylesheet" href="${config.codeMirror.tern}">            
            <style>${style}</style>
            <style id="config">${styleVariable}</style>
            <div style="float: left">
            Tema
            <select>
            <option value="one-dark">atom</option>
            <option value="ambiance">ambiance</option>
            <option value="darcula">darcula</option>
            <option value="default" selected>default</option>            
            <option value="material">material</option>
            <option value="mbo">mbo</option>
            <option value="neo">neo</option>            
            <option value="solarized dark">solarized dark</option>
            <option value="solarized light">solarized light</option>                            
            <option value="vscode-dark">visual studio</option>                            
            
            </select>
            </div>
            <div style="float: right">
                <button title="Ayuda" id="ayuda"> ? </button>
            </div>
            <div style="float: right">
            Tamaño letra
            <input type="number" value="10" min="10" max="50">
            </div>
            <div class="variable principal" style="float: left">
                <textarea class="editor"></textarea>                    
            </div>
        `;           
        let textarea = shadowRoot.querySelector(".editor");
        this.configEstilo = shadowRoot.querySelector('#config');

        let modo = this.getAttribute('modo');
        modo = modo ? modo : 'javascript';
        let contenedor = this.shadowRoot.querySelector('.principal');
        this.editor = CodeMirror.fromTextArea(textarea, {
            lineNumbers: true,
            matchBrackets: true,
            continueComments: "Enter",
            extraKeys: {
                "Ctrl-Space": ()=>{
                    this.addAutocompletar();
                }, 
                "Ctrl-Q": "toggleComment"},
            mode: modo,            
            theme: 'default',
            tabSize: 4,
            smartIndent: false,
            hintOptions: {
                container: contenedor
            }
        });
        const codigo = this.getAttribute('codigo');
        if (codigo != null) {
            this.setCodigo(codigo);
        }
        if (modo == 'javascript') {
            this.agregarTern();
        } else {
            this.addAutocompletar();
        }
        this.addListeners();
    }

    get value() {
        return this.getCodigo();
    }

    agregarTern() {
        let server;
        fetch("https://ternjs.net/node_modules/tern/defs/ecmascript.json")
        .then(data => data.text())
        .then(text => {            
            server = new CodeMirror.TernServer({defs: [JSON.parse(text), definicionesClaseBase]});
            this.editor.setOption("extraKeys", {
                "Ctrl-Space": function(cm) { server.complete(cm);},
                "Ctrl-I": function(cm) { server.showType(cm);},
                "Ctrl-O": function(cm) {server.showDocs(cm);},
                "Alt-.": function(cm) { server.jumpToDef(cm); },
                "Alt-,": function(cm) { server.jumpBack(cm); },
                "Ctrl-Q": function(cm) { server.rename(cm); },
                "Ctrl-.": function(cm) { server.selectName(cm); }
            });            
            this.editor.on("cursorActivity", function(cm) { server.updateArgHints(cm); });
        });
    }

    addAutocompletar() {
        let listaAutocomletado = [];
        let hint = this.getAttribute('hint');
        if (hint == 'editor-css') {
            listaAutocomletado = getHitsCss();
        }
        let editor = this.editor;
        let contenedor = this.shadowRoot.querySelector('.principal');        
        CodeMirror.showHint(editor, function () {
            let cursor = editor.getCursor();
            let token = editor.getTokenAt(cursor);
            let start = token.start;
            let end = cursor.ch;
            let line = cursor.line;
            let currentWord = token.string;
            let extraEspacios = 0;                      
            let list = listaAutocomletado.filter(function (item) {
                return item.displayText.trim().indexOf(currentWord) == 0;
            });
            return {
              list: list.length ? list : listaAutocomletado,
              from: CodeMirror.Pos(line, start + extraEspacios),
              to: CodeMirror.Pos(line, end) };
      
            }, { 
            completeSingle: false,
            container: contenedor
        });
    }    

    connectedCallback() {
        let tema = this.getAttribute('tema');
        if (tema) {
            this.setTema(tema);
        }
    }

    setFontSize(size){
        this.configEstilo.innerHTML = `
            .variable {    
                --size-font: ${size}px;
            }
        ;`;
        this.setCodigo(this.editor.getValue());
    }

    setTema(tema) {
        let select = this.shadowRoot.querySelector('select');
        select.value = tema;
        this.editor.setOption("theme", tema);
    }

    addListeners() {    
        let select = this.shadowRoot.querySelector('select');
        select.addEventListener('change', (data)=>{
            this.editor.setOption("theme", select.value);
        });
        this.editor.on('change', data => {            
            this.emiteChange(data.getValue());
        });
        let input = this.shadowRoot.querySelector('input');
        input.addEventListener('change', data=> {
            this.setFontSize(input.value);
        });
        let that = this;
        this.editor.on("keyup", function (cm, event) {
            if(event.key == '$'){
                that.addAutocompletar();
            }
        });
        let ayuda = this.shadowRoot.querySelector('#ayuda');
        ayuda.addEventListener('click', e => {
            console.log(this.getAttribute('ayuda'));
        });
    }
    emiteChange(code) {
        let event = new CustomEvent("changeCode", {
            detail: {
                code: code
            }
        });
        this.dispatchEvent(event);
    }

    getCodigo() {
        return this.editor.getValue();
    }

    setCodigo(code) {
        this.editor.setValue(code);
    }

    actualiza() {
        this.setCodigo(this.getCodigo());
        let select = this.shadowRoot.querySelector('select');
        let tema = select.value;
        let tem = tema == 'default' ? 'ambiance' : 'default';
        this.setTema(tem);
        setTimeout(ev => {
            this.setTema(tema);
        }, 1);
    }

    creaNuevoEstilo(nombreEstilo) {
        const estilo = `
.${nombreEstilo}{
}
`;      
        this.setCodigo(this.getCodigo() + estilo);
    }

    creaNuevoMetodoJs(nombreMetodo) {
        const metodo = `
        ${nombreMetodo}() {                
        },\n`;
        let codigo = this.getCodigo();
        let indice = codigo.indexOf('metodos:');                
        let pegarEn = -1;
        for (let i = indice; i<codigo.length; i++){
            if(codigo[i] == '{') {
                pegarEn = i+1;
                break;
            }
        }
        codigo = codigo.substring(0, pegarEn) +
                metodo + codigo.substring(pegarEn, codigo.length);
        this.setCodigo(codigo);
    }
}

customElements.define('x-codigo', xCodigo);