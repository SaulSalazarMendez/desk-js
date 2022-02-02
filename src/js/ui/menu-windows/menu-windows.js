import { config } from '../../config.js';
import { MenuAero } from '../menu-aero/menu-aero.js';

const style = /*css*/`
.menu {
    height: 80px;
    width: 230px;    
    cursor: pointer;
    border-radius: 5px;
}

.menu:hover {
    filter: invert(25%);
    border: 1px solid;
}

.icono{
    border-radius: 5px;    
}

`;

class MenuWindows extends MenuAero {
    constructor(){
        super();
    }
  
    render() {
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
    
    getIcono(menu) {
        if (menu.imagen) {
            return `<img src="${menu.imagen}" style="width: 50px;" class="w3-round w3-left">`;
        }
        return `
        <div class="w3-button w3-xlarge ${menu.color} icono w3-left">
            <i class="fa fa-${menu.icono} w3-xlarge"></i>
        </div>
        `;
    }

    creaMenu(menu) {
        let div = document.createElement('div');
        div.innerHTML =`
        ${this.getIcono(menu)}
    	<div class="w3-left w3-padding w3-tiny">
            ${menu.nombre}
        </div>        
        `;
        div.classList.value = 'w3-container w3-left menu w3-padding';
        div.addEventListener('dblclick', ev => {
            this.emiteSelectOpcion(menu);
        });
        return div;
    }
    
}

customElements.define("x-menu-windows", MenuWindows); //Register the new element