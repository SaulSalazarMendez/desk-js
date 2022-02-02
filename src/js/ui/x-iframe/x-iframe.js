class XIframe extends HTMLElement {
    constructor(){
        super();
        this.padre = null;
        this.overIframe = false;
        this.render();
    } 
  
    render() {
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `            
        <iframe allowfullscreen></iframe>
        `;
        const padre = this.parentNode;
        const iframe = shadowRoot.querySelector('iframe');        
        iframe.style.position = "absolute";
        iframe.style.top = "38px";              
    }

    connectedCallback() {
        if (!this.hasAttribute('otropadre')) {            
            this.cargaDefualPadre();
        }
    }

    cargaDefualPadre(){
        let padre = this.parentNode;
        this.observaPadre(padre);
    }
    
    static get observedAttributes() {
        return ['src'];
    }
    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }
    set src(val) {        
        const iframe = this.shadowRoot.querySelector('iframe');
        iframe.src = val;
    }
    get src() {
        return iframe.src;
    }

    setPadre(padre) {
        this.observaPadre(padre);
    }

    observaPadre(padre) {
        const iframe = this.shadowRoot.querySelector('iframe');
        const config = { attributes: true};                 
        var observer = new MutationObserver(function(mutations) {            
            iframe.style.width = 'calc(100% - 12px)';
            iframe.style.height = (padre.clientHeight -45 )+"px";            
        });
        observer.observe(padre, config);
    }
}

customElements.define("x-iframe", XIframe); //Register the new element