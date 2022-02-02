# Base de datos

Se tiene la base de datos de indexedDB la cual nos permitira guardar todos los objetos de
nuestra aplicación.

La base de datos indexedDB es no relacional por tantoi podemos guardar jsons.

## tablas (stores)

Tenemos las siguientes tablas
- grupos
- flujos
- vistas
- usuarios
- metadataVistas

### grupos
Contiene los grupos o roles de la aplicación. 
De esta tabla se desprende el funcionamiento de usuario y
caminos.
estructura
```
{
    id,
    nombre
}
```
### flujos
contiene el flujo que seguirá cada grupo, en esta tabla se
define la vista de inicio y apartir se definen los caminos.
Un camnino va tener condiciones de acceso y la vista de que depende.
la estructura del flujo es:`
```
{
    id,
    idGrupo,
    caminoInicial: ,
    
}
```
donde el nodo tiene la siguiene estructura:
```
{
    id
    idVista
    condiciones
    caminos
}
```
### vistas
Guarda la información de todas las vistas de la aplicación,
esta tabla contiene la estructura:
```
{
    id,
    nombre,
}
```

### metadataVistas
Guarda la información que complementa las vistas, dado que
puede ser mucha esta información se pone en una tabla aparte.
la estructura de esta es:
```
{
    id,
    idVista,
    codigo,
    estilo,
    componentes,
    objetoglbal
}
```

### objetoglobal
Es un json que contiene la información princpal con la que trabaja la aplicación
De este y el usuario se obtendran las condiciones para acceder a los flujos.

### usarios
Contiene los usuarios registrados para la aplicación que estamos creando.
```
{
    id,
    usuario,
    password,
    datosPersonales: {
        ...
    },
    idGrupo
}
```
Donde datos personales son definidos dentro de la aplicación.

