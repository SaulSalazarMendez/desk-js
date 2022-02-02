/**
 * Clona un objeto json
 * @param {Object} json 
 */
export function clonarJson(json) {
    return JSON.parse(JSON.stringify(json));
}

/**
 * Descarga un archivo
 * @param {any} data Es un stream de datos, puede ser texto o hexadecimal.
 * @param {string} filename Nombre del archivo
 * @param {string} type Define el content-type del archivo descargado
 */
export function downloadFile(data, filename, type) {
    var blob = new Blob([data], { type: type });
    var elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
}
/**
 * Define el error generado por crear
 * un blob en base
 */
class ErrorBlobToBase64 extends Error {
    constructor(messaje) {
        super(messaje);
    }
}
/**
 * Crea stream de base 64 del blob dado
 * @param {blob} blob Puede ser tambien un File
 */
export function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        if (!(blob instanceof Blob)) {
            reject(new ErrorBlobToBase64('No es un blob el dato introducido'));
        }
        let reader = new FileReader();
        reader.onload = function (data) {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });
}
/**
 * Lee un archivo de texto de una ruta dada.
 * @param {string} url 
 */
export function getFileText(url) {
    return fetch(url).then(response => response.text());
}
/**
 * Descarga cualquier blob o File de la aplicacion.
 * @param {blob} blob 
 * @param {string} filename  Descarga cualquier blob
 */
export function downloadAnyBlob(blob, filename) {
    let elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
}
/**
 * Configuracion de beautify
 */
const opciones = {
    "indent_size": 4,
    "indent_char": " ",
    "indent_with_tabs": false,
    "editorconfig": false,
    "eol": "\n",
    "end_with_newline": false,
    "indent_level": 0,
    "preserve_newlines": true,
    "max_preserve_newlines": 10,
    "space_in_paren": false,
    "space_in_empty_paren": false,
    "jslint_happy": false,
    "space_after_anon_function": false,
    "space_after_named_function": false,
    "brace_style": "collapse",
    "unindent_chained_methods": false,
    "break_chained_methods": false,
    "keep_array_indentation": false,
    "unescape_strings": false,
    "wrap_line_length": 0,
    "e4x": false,
    "comma_first": false,
    "operator_position": "before-newline",
    "indent_empty_lines": false,
    "templating": ["auto"]
};
/**
 * Regresa el codigo con formato de js
 * @param {string} data Codigo fuente javascript
 */
export function formatoCodigoJs(data) {
    return js_beautify(data, opciones);
}
/**
 * Regresa el codigo con formato html
 * @param {string} data Codigo fuente html
 */
export function formatoCodigoHtml(data) {
    return html_beautify(data, opciones);
}
/**
 * Descarga codigo fuente, primero le da formato al codigo dado.
 * @param {string} data Codigo fuente
 * @param {string} filename nombre del archivo
 * @param {string} type content-type
 */
export function downloadSource(data, filename, type) {
    let datab = js_beautify(data, opciones);
    downloadFile(datab, filename, type);
}
/**
 * Descarga codigo fuente, primero le da formato al codigo dado.
 * @param {string} data Codigo fuente
 * @param {string} filename nombre del archivo
 * @param {string} type content-type
 */
export function downloadHtml(data, filename, type) {
    let datab = html_beautify(data, opciones);
    downloadFile(datab, filename, type);
}