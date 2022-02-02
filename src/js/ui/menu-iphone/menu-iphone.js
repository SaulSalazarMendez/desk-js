import { config } from '../../config.js';
import { MenuAero } from '../menu-aero/menu-aero.js';

const style = /*css*/`
.menu {
    height: 100px;
    width: 150px;    
    cursor: pointer;    
}

.menu:hover {
    filter: invert(25%);
}

.icono{
    border-radius: 5px;
}

`;

class MenuIphone extends MenuAero {
    constructor(){
        super();       
    } 
  
    render() {
        console.log(style);
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${config.w3css}">
            <link rel="stylesheet" href="${config.fontAwesome}">
            <style>${style}</style>
            <div class="w3-block">
                <div menu-content></div>
            </div>
        `;
    }    

    creaMenu(menu) {
        let div = document.createElement('div');
        div.innerHTML =`
        <div class="w3-button w3-xlarge ${menu.color} icono">
            <i class="fa fa-${menu.icono} w3-xlarge"></i>
        </div>
    	<div class="w3-tiny w3-padding">
            ${menu.nombre}
        </div>        
        `;
        div.classList.value = 'w3-container w3-cell w3-cell-bottom w3-center w3-left menu';
        div.addEventListener('dblclick', ev => {
            this.emiteSelectOpcion(menu);
        });
        return div;
    }
}

customElements.define("x-menu-iphone", MenuIphone); //Register the new element