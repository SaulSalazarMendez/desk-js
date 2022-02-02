
/**
 * Muestra a nyancat, que mas puedes pedir
 */
export function llamaNyancat() {
    let nyancat = document.createElement('div');
    nyancat.style.cssText = 'position: absolute; top: 50%; left: 40%; z-index: 10001';
    nyancat.innerHTML = '<img src="./img/nyancat.gif">';
    nyancat.classList.value = 'animate__animated animate__backInLeft animate__delay-1s';    
    let body = document.querySelector('body');
    body.append(nyancat);
    let sonido = new Audio('./img/hola-adios.mp3');  
    nyancat.appendChild(sonido);  
    let veces = 0;
    nyancat.addEventListener('animationend', (ev) => {
        if (veces == 0) {
            sonido.play();
            nyancat.classList.value = "animate__animated animate__backOutRight animate__delay-1s";
            veces ++;
        } else {
            nyancat.remove();
        }        
    });
}