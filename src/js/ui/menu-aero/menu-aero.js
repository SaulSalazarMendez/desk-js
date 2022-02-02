import { config } from '../../config.js';

const style = /*css*/`
.cuadro-aero {
    padding: 2px;
    float: left;
    cursor: pointer;
}
.cuadro-aero:hover {
    filter: invert(25%);
}
.padding-cuadro{
    padding: 30%;
}
.cuadro {
    height: 150px;
    width: 150px;
}

`;

export class MenuAero extends HTMLElement {
    constructor(){
        super();
        this.menus = [{
            nombre: 'Grupos',
            icono: 'users',
            color: 'w3-indigo'
        },{
            nombre: 'Usuario',
            icono: 'user-circle',
            color: 'w3-red'
        },
        ];
        this.render();
        this.setMenu(this.menus);        
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
            return `
            <img src="${menu.imagen}" style="width: 115px;" class="w3-round w3-left w3-border">
            `;
        }
        return `        
            <div class="w3-center padding-cuadro">
                <i class="fa fa-${menu.icono} w3-xlarge"></i>
            </div>
        
        `;
    }

    creaMenu(menu) {
        let div = document.createElement('div');
        div.innerHTML =`
        <div class="cuadro w3-container w3-cell w3-cell-bottom ${menu.color}">            
            ${this.getIcono(menu)}            
            <div>
                ${menu.nombre}
            </div>
        </div>
        `;
        div.classList.value = 'cuadro-aero';
        div.addEventListener('dblclick', ev => {
            this.emiteSelectOpcion(menu);
        });
        return div;
    }

    emiteSelectOpcion(menu) {    
        this.dispatchEvent(
            new CustomEvent('select', {
                detail: {
                    menu: menu,
                    select: true
                }
            })
        );    
    }

    setMenu(menus) {
        let contenedor = this.shadowRoot.querySelector('[menu-content]');
        this.menus = menus;
        contenedor.innerHTML = '';
        for(let menu of menus) {
            contenedor.appendChild(this.creaMenu(menu));
        }
    }
}

customElements.define("x-menu-aero", MenuAero); //Register the new element