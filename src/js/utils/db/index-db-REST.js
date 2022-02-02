export class IndexedDBREST {    
    /**
     * Constructor
     * @param {string} nameDB Nombre de la base de datos
     * @param {number} versionDB Numero de versión
     * @param {{}} tablas Objeto de tablas que se crearan.
     * @param {function} onError callback que regresa TODOS los errores de ejecución
     */
    constructor(
        nameDB,
        versionDB,
        tablas,
        onError
    ) {
        this.isStart = false;
        this.db=null;
        this.onError = onError;
        let obj=this;
        let indexedDB = window.indexedDB ;
        let open = indexedDB.open(nameDB, versionDB);
        this.tablas = tablas;
        this.folio = Date.now();
        //si no existe la base o se actualiza la version se crea todo el schema
        open.onupgradeneeded = () => {
            let db = open.result;
            if (tablas){
                for (const tabla in tablas){
                    try{
                        db.createObjectStore(tabla, { keyPath: tablas[tabla].id });
                    } catch(e) {
                        console.log(`%cYa existe ${tabla}`, 'color: red');
                    }
                }
            }
            obj.db = open.result;
        };
        open.onsuccess = function(){
            obj.db = open.result;            
            obj.isStart = true;
        };
        open.onerror = (e) => {
            if (!obj.isStart) {
                obj.isStart = false;
            }
            if (onError) {
                onError(e);
            }
        };
    }

    getFolio() {
        this.folio++;
        return this.folio;
    }

    copy(json){
        if (!json) {
            return undefined;
        }
        return JSON.parse(JSON.stringify(json));
    }

    /**
     * Agrega un registro a la tabla _table
     * @param _table tabla con la que se trabajara
     * @param _datos datos a guardar
     * @param _auto_id crear un id automaticamente
     * @return Una promesa que devuelve el registro agregado o el error
     */
    post(
        _table,
        _data,
        _auto_id = true
    ){
        let obj = this;
        return new Promise(
            (resolve, reject) =>{
                if (!obj.db){
                    reject('Error: no init indexedDB');
                } else {
                    try {
                        let db    = obj.db;
                        let tx    = db.transaction(_table, 'readwrite');
                        let store = tx.objectStore(_table);
                        let json = _data;
                        if (_auto_id) {
                            json[this.tablas[_table].id] = obj.getFolio();
                        }
                        let request = store.put(json);
                        request.onsuccess = function() {
                            let out = _data;                        
                            resolve ( obj.copy(out) ) ;
                        };
                        request.onerror = function(e){
                            this.onError({type: 'POST', error: e});
                            reject('Ocurrio un error');
                        };
                        tx.oncomplete = function() {                            
                        };
                    } catch (error) {
                        setTimeout( () => {
                            obj.post(_table, _data).then( res => { resolve(res);})
                            .catch(err=>{reject(err);});
                        }, 1000);
                    }                    
                }
            }
        );
    }

    /**
     * Funcion busca un elemento en la tabla dada.
     * @param _table tabla con la que se trabajara
     * @param _key llave a buscar
     * @return una promesa que contienen el elemento encontrado o el error
     */
    get(
        _table,
        _key
    ){
        let obj = this;
        return new Promise((resolve, reject) =>{
            if (!obj.db){
                reject('Error: no init indexedDB');
            } else {
                try {
                    let db    = obj.db;
                    let tx    = db.transaction(_table, 'readonly');
                    let store = tx.objectStore(_table);
                    let request=store.get(_key);
                    request.onsuccess=function(){
                        let out = request.result;                        
                        resolve ( obj.copy(out) ) ;
                    };
                    request.onerror = function(e) {
                        this.onError({type: 'GET', error: e});
                        resolve(null);
                    };
                    tx.oncomplete = function() {
                        
                    };    
                } catch (error) {
                    setTimeout( () => {
                        obj.get(_table, _key).then( res => { resolve(res);})
                        .catch(err=>{reject(err);});
                    }, 1000);
                }
                
            }
        });
    }
    
    /**
     * Esta funcion manda el error o la actualizacion hasta que se desocupa la transacion
     * @param _table Tabla que se actualizara
     * @param _data json con los cambios
     */
    put(
        _table,
        _data
    ){
        let obj = this;
        return new Promise((resolve, reject) =>{
            if (!obj.db){
                reject('Error: no init indexedDB');
            } else {
                try {
                    let db    = obj.db;
                    let tx    = db.transaction(_table, 'readwrite');
                    let store = tx.objectStore(_table);
                    const _id = this.tablas[_table].id;
                    if (!_data.hasOwnProperty(_id)) {
                        _data[_id] = obj.getFolio();
                    }
                    let request = store.put(_data);
                    request.onsuccess = function() {
                        let out = _data;                        
                        resolve ( obj.copy(out) ) ;
                    };
                    request.onerror = function(e){
                        this.onError({type: 'PUT', error: e});
                        reject('Ocurrio un error');
                    };
                    tx.oncomplete = function() {
                    };    
                } catch (error) {
                    setTimeout( () => {
                        obj.put(_table, _data).then( res => { resolve(res);})
                        .catch(err=>{reject(err);});
                    }, 1000);
                }
                
            }
        });
    }

    /**
     * Funcion que elimina un registro a la tabla _table
     * @param _table tabla con la que se trabajara
     * @param _key elemento a eliminar     
     * @return Una promesa que devuelve true si se elimina o false si no se pudo
     */
    delete(
        _table,
        _key
    ){
        let obj = this;
        return new Promise((resolve, reject) =>{
            try {                    
                let db    = obj.db;
                let tx    = db.transaction(_table, 'readwrite');
                let store = tx.objectStore(_table);
                let requets=store.delete(_key);
                requets.onsuccess=function(e){
                    let out = true;                        
                    resolve(out);
                };
                requets.onerror = function(e) {
                    let out = false;                        
                    this.onError({type: 'DELETE', error: e});
                    resolve(out);
                };
                tx.oncomplete = function() {
                    
                };                      
            } catch (error) {
                setTimeout( () => {
                    obj.delete(_table, _key).then( res => { resolve(res);})
                    .catch(err=>{reject(err);});
                }, 1000);
            }
        });
    }

    /**
     * Funcion que lista los elementos de latabla dada
     * @param _table tabla con la que trabajara
     * @return una promesa que devuelve la lista de elementos de la tabla dada o el error
     */
    list(
        _table
    ){
        let obj = this;
        return new Promise(
            (resolve, reject) =>{
                try {
                    let db    = obj.db;
                    let tx    = db.transaction(_table, 'readonly');
                    let store = tx.objectStore(_table);
                    let list = store.openCursor();
                    let items = [];
                    list.onsuccess = function(evt){
                        let cursor = evt.target.result;
                        if (cursor) {
                            items.push(cursor.value);
                            cursor.continue();
                        }                        
                    };
                    list.onerror = function (e) {
                        this.onError({type: 'LIST', error: e});
                        reject(e);
                    };
                    tx.oncomplete = function () {
                        resolve(obj.copy(items));
                    };  
                } catch (error) {
                    setTimeout( () => {
                        obj.list(_table).then( res => { resolve(res);});
                    }, 1000);
                }
            }
        );
    }

    /**
     * Funcion para eliminar el contenido de una tabla
     * @_table_ nombre de la tabla a limpiar
     * @return devuelve una promesa que contienen true o el error.
     */
    clear(
        _table
    ){
        let obj = this;        
        return new Promise(
            (resolve, reject) =>{
                if (!obj.db){
                    reject('Error: no init indexedDB');
                } else {
                    let db    = obj.db;
                    let tx    = db.transaction(_table, 'readwrite');
                    let store = tx.objectStore(_table);
                    let req = store.clear();
                    req.onsuccess = function(evt) {
                        let out = true;                        
                        resolve(out);
                    };
                    req.onerror = function(e) {
                        this.onError({type: 'CLEAR', error: e});
                        reject(e);
                    };
                }
            }
        );
    }
}
