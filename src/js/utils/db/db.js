import {IndexedDBREST} from './index-db-REST.js';

/**
 * Definición de las tablas de indexedDb
 */
const tablas = {
    proyectos: {
        id: 'id'
    },
    vistas: {
        id: 'id'
    },
    grupos: {
        id: 'id'
    },
    usuarios: {
        id: 'id'
    },
    caminos: {
        id: 'id'
    },
    metadataVistas: {
        id: 'id'
    },
    headers: {
        id: 'id'
    },
    footers: {
        id: 'id'
    },
    globals: {
        id: 'id'
    },
    componentes: {
        id: 'tag'
    },
    apps: {
        id: 'tag'
    },
    componentesIde: {
        id: 'tag'
    }
};

/**
 * Version de indexedDb, se cambia con cada cambio de las tablas.
 */
const version = 8;

let db = new IndexedDBREST('w3-studio', version, tablas);
/**
 * regresa la instancia de indexedDb. 
 * Es importante tener una solo instancia para no saturar las peticiones a esta.
 */
export function getDB() {
    return db;
}

const eventoBaseDatos = new CustomEvent('readyDB',{
    detail: {
        info: 'Base de datos lista'
    }
});

document.dispatchEvent(eventoBaseDatos);
