class MusicPlayer {
    constructor() {
        this.player = new Audio();
        this.indice = 0;
        this.lista = [];
        this.load();
        this.addListeners();        
    }

    addListeners() {
        this.player.addEventListener('ended', ev => {            
            this.next();
        });
    }
    /**
     * Agrega una pista de sonido
     * @param {string} track url de la pista
     */
    add(track) {
        if (track) {
            this.lista.push(track);
            this.save();
        }        
    }

    save() {
        localStorage.setItem('lista_player', JSON.stringify(this.lista));
    }

    load() {
        let lista  = localStorage.getItem('lista_player');
        if (lista) {
            this.lista = JSON.parse(lista);
        }
    }

    play() {
        if (this.lista.length == 0) {
            return;
        }
        if (!this.player.src){
            this.player.src = this.lista[this.indice];
            this.indice = (this.indice + 1) % this.lista.length;
        }   
        if (!this.player.paused) {
            this.player.load();            
        }
        this.player.play();
    }

    pause() {
        this.player.pause();
    }

    estatus() {
        if ( this.player.paused) {
            if (this.player.src != '') {
                return 'PAUSADO';
            }
            return 'PARADO'
        }
        return 'REPRODUCIENDO';
    }

    next10s() {
        if (this.player.src != '') {
            this.player.currentTime += 10;
        }
    }

    back10s() {
        if (this.player.src != '') {
            this.player.currentTime -= 10;
        }
    }

    stop() {
        this.player.pause();
        this.player.load();
    }

    next() {
        if (this.lista.length == 0) {
            return;
        }
        this.player.src = this.lista[this.indice];
        this.indice = (this.indice + 1) % this.lista.length;        
        this.player.load();
        this.player.play();
    }
}
let player = new MusicPlayer();

export function getMusicPlayer() {
    return player;
}