import { addWindowConParametros } from "../ventana/agregarApps.js";
import { showTexto } from "./archivo-text.js";
import { showAudio, showVideo } from "./archivo-multimedia.js";

/**
 * 
 * @param {File} file 
 */
export function procesaArchivo(file) {
    let div = addWindowConParametros('div', file.name);
    if (file.type == 'text/plain'){        
        showTexto(div, file);
    }
    if (file.type == 'audio/mpeg'){
        showAudio(div, file);
    }
    if (file.type == 'video/mp4'){
        showVideo(div, file);
    }    
}