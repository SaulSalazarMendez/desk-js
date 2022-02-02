const template = /*html*/`
<div>
    <div id="contenido" class="w3-container">        

    </div>
    <button class="w3-button salir " @click="bloquear()">
    <img style="width: 20px;" src="https://openclipart.org/download/197891/mono-logout.svg">
    Bloquear
    </button>
    <button class="w3-button expandir " @click="expandir()">
    <i class="fa fa-arrows-alt"></i>
    </button>
</div>
`;


export default {
    props: ['apps'],
    template: template,
    data: () => {
        return {
            menu: null,
            buscar: '',
        };
    },
    mounted() {
        this.menu = this.$el.querySelector('#contenido');
        this.creaMenus();
    },
    methods: {
        creaMenus() {            
            for( let item of this.apps) {
                let div = document.createElement('div');
                div.classList.value = 'w3-container';
                let menu = document.createElement('x-menu-android');
                div.innerHTML = `
                <h5 propiedades="" class="margen-izq">
                    <img style="width: 20px;" src="${item.icono}"> ${item.nombre}
                </h5>
                `;
                div.append(menu);
                this.menu.append(div);
                menu.setMenu(item.apps);
                menu.addEventListener('select', ev => this.abrir(ev));
            }
        },    
        abrir(ev){            
            this.$emit('abrir', ev.detail.menu);
        },
        bloquear() {
            this.$emit('bloquear', true);
        },
        expandir() {
            this.$emit('expandir', true);
        },        
    }
};
