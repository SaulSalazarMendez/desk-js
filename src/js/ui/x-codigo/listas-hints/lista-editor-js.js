export const definicionesClaseBase = {    
    "Any": {
      "!type": "Object",      
      "!doc": "Representa cualquier tipo de dato."
    },
    "ClaseComponente": {
        "!type": "fn() -> Object",        
        "!doc": "Base para crear los Clases de Componentes",
        "constructor": {
            "!type": "fn()",            
            "!doc": "Declara las variables y atributos del componente"
        },
        "init": {
            "!type": "fn()",            
            "!doc": "Funcion para inicializar el componente, se llama en la creacion del componente"
        },
        "mount": {
            "!type": "fn()",            
            "!doc": "Funcion que se llama cada vez que se monta en el DOM el componente"
        },
        "unmount": {
            "!type": "fn()",            
            "!doc": "Funcion que se llama cada vez que se desmonta en el DOM el componente"
        },
    },
    "constructor": {
        "!type": "fn()",            
        "!doc": "Declara las variables y atributos del componente"
    },
    "init": {
        "!type": "fn()",            
        "!doc": "Funcion para inicializar el componente, se llama en la creacion del componente"
    },
    "mount": {
        "!type": "fn()",            
        "!doc": "Funcion que se llama cada vez que se monta en el DOM el componente"
    },
    "unmount": {
        "!type": "fn()",            
        "!doc": "Funcion que se llama cada vez que se desmonta en el DOM el componente"
    },
    "$DefineClaseDelComponente": {
        "!type": "fn(clase: Object) -> void",            
        "!doc": "Funcion que define la clase del componente. Uso $DefineClaseDelComponente(MiComponente)."
    },
    "$DefineAtributo": {
        "!type": "fn() -> Any",
        "!doc": "Declara un atributo. Uso this.color = $DefineAtributo();"
    },
    "$DefineVariable": {
        "!type": "fn(valor: ?) -> Any",
        "!doc": "Declara una variable. Uso this.lista = $DefineVariable([]);"
    },
    "$DefineDomItem": {
        "!type": "fn(selector: string) -> HTMLElement",
        "!doc": "Define una instancia al elemento del componente definido por el selector. Uso this.lista = $DefineDomItem('h1')"
    }
};