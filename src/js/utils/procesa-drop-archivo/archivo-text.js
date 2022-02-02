/**
 * 
 * @param {HTMLElement} div 
 * @param {File} file 
 */
export function showTexto(div, file){
    let fr=new FileReader();
    fr.onload=function(){
        div.innerHTML= `<pre>${fr.result}</pre>`;
    }
    fr.readAsText(file);
}