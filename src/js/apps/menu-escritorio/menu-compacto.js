const template = /*html*/`
<div>
    <input class="w3-input" type="text" style="width:100%" placeholder="Buscar" @input="onbuscar($event)" v-model="buscar">
    <div class="w3-row">
    <div class="w3-col m6">         
        <button v-for="(item,key) in apps" :key="key"
        class="w3-button w3-block w3-left-align" @click ="setActivo(item)">
        <img style="width: 20px;" :src="item.icono">
        {{item.nombre}}
        </button>        
        <!--<button class="w3-button">
        <img style="width: 20px;" src="https://openclipart.org/download/183014/1378371919.svg">
        Proyecto
    </button>-->
    </div>
    <div class="w3-col m6">
        <div class="w3-button w3-block w3-left-align" v-for="(item,index) in menu" @click="abrir(item)" :key='index'>          
        {{item.nombre}}
        </div>
    </div>
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
            menu: [],            
            buscar: '',
        };
    },
    mounted() {        
    },
    methods: {
        setActivo(item) {
            this.menu = item.apps;
            this.buscar = '';
        },
        abrir(item){
            this.$emit('abrir', item);
        },
        bloquear() {
            this.$emit('bloquear', true);
        },
        expandir() {
            this.$emit('expandir', true);
        },
        onbuscar(val) {
            let cad = val.target.value;
            if (cad == '') {
                this.menu = [];
                return;
            }
            cad = cad.toLowerCase();
            this.menu = [];
            for(let item of this.apps){
                for(let app of item.apps){
                    if (app.nombre.toLowerCase().indexOf(cad)>=0) {
                        this.menu.push(app);
                    }
                }
            }
        },
    }
};
