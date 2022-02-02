# Páginador files

Este componente es para listar elementos, la idea es que parezca un explorador de archivos.

## Parámetros

Se cuentan con dos:
- titulo: Se pone el título de la vista mostrada
- vista-previa: Es el tag que se usara en la vista previa.

## Eventos

- onOpenItem: Se activa cuando se da doble click en algún item listado. Regresa un customEvent, en la propiedad detaill esta el item seleccionado.
- onVistaPrevia: Se activa cuando se da click en algún item listado. Regresa un customEvent, en la propiedad detail esta el item y elemento de vista previa.

## Uso

Primero se agrega la etiqueta

```html
<x-paginador-files titulo="titulo" vista-previa="vista-previa"></x-paginador-files>
```

Se selecciona el elemento

```javascript
let paginador = documento.querySelector('x-paginador-files');
```

Se escuchan los eventos onVistaPrevia y onOpenItem

```javascript
paginador.addEventListener('onVistaPrevia', (evento) => {
    const r = evento.detail;
    console.log(r);
});

paginador.addEventListener('onOpenItem', (evento) => {
    const r = evento.detail;
    console.log(r);
});
```
### onVistaPrevia
El evento onVistaPrevia devuleve en evento.detail el siguiente objecto:
```javascript
{
    item: item, //el item seleccionado de la lista
    vistaPrevia: vistaPrevia //la instancia de la vista previa
}
```
Después de este puede pasarle la informacion necesaria a la vista previa.

### onOpenItem
El evento onVistaPrevia devuleve en evento.detail el siguiente objecto:
```javascript
{
    item: item, //el item seleccionado de la lista
}
```
Después de este puede abrir una ventana con algun visor o editor y pasarle el item.