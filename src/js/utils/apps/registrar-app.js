import { getDB } from "../db/db.js"

/** Aplicacion */
const appInterface = {
    /** tag del webcomponente */
    tag: '',
    /**nombre app */
    titulo: '',
    /** descripcion app */
    descripcion: '',
    /** categoria */
    categoria: '',
    /** icono fa fa*/
    icono: '',
    /** codigo app */
    codigo: ''
}



/**
 * 
 * @param {appInterface} app 
 */
export async function registraApp(app) {
    return new Promise((resolve, reject) => {
        let db = getDB();
        try {
            eval(app.codigo);
            await db.put('apps', app);
            resolve('Se instalo la app ', app.titulo);
        } catch(e) {
            reject('No se pudo instalar la app')
        };
    });
}

/**
 * 
 * @param {appInterface} app 
 */
export async function eliminarApp(app) {
    return new Promise((resolve, reject) => {
        let db = getDB();
        try {            
            await db.delete('apps', app.tag);
            resolve('Se elimino la app ', app.titulo);
        } catch(e) {
            reject('No se pudo instalar la app')
        };
    });
}