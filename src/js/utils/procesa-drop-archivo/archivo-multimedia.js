export function showAudio(div, file){
    let blobURL = window.URL.createObjectURL(file);
    div.innerHTML = `
    <audio controls>        
        <source src="${blobURL}" type="audio/mpeg">
        Your browser does not support the audio element.
        </audio>
    `;
}

export function showVideo(div, file){
    let blobURL = window.URL.createObjectURL(file);
    div.innerHTML = `
    <video controls>
    <source src="${blobURL}" type="video/mp4">  
    Your browser does not support the video tag.
    </video>
    `;
}