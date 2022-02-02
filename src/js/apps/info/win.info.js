const template = /*html*/ `
<div>
    <x-bar-menu color="w3-blue-grey" 
        titulo="Sobre.." icono="info-circle"></x-bar-menu>
    <h3>Desk interface</h3>    
    <strong>Version</strong>: 1<br>
    <strong>Librerias</strong>: 
        <a href="https://www.w3schools.com/w3css/">W3.css</a> 
        <a href="https://animate.style/">Animate css</a>
        <a href="https://vuejs.org/">Vue</a><br>    
    <strong>Autor</strong>: <a href="http://saulsm.epizy.com/">Saúl Salazar Méndez</a><br>
    <p>Iterface web que simula un escriotrio virtual, el proposito de esta interface es dar una opción 
    más al usuario para su aplicación web.</p>
    <p>Esta interface usa las librerías w3css, animate, codemirror y vue. Se implemento el escriotrio, ventanas y su iteracion con web componentes</p>
</div>
`;

class WinInfo extends HTMLElement {
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
        let app = new Vue({
            el: div,
            template: template,
        });
    }
}

customElements.define("win-info", WinInfo); //Register the new element