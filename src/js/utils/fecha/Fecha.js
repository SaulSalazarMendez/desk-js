/**
 * Clase para imprimir la fecha. extiende de Date, 
 * por lo que se puede usar todos sus metodos definidos.
 */
export class Fecha extends Date{
    constructor() {
        super();
    }
    /**
     * Metodo que regresa el formato en HH:MM a.m.|p.m.
     */
    toTimeString() {
        let minutos = ('0'+this.getMinutes()).substr(-2);
        let hora = this.getHours();
        hora = hora<=12 ? hora : hora - 12;
        let horas = ('0'+hora).substr(-2);
        let isAm = this.getHours() > 12 ? 'p.m.' : 'a.m.';
        return `${horas}:${minutos} ${isAm}`;

    }
}