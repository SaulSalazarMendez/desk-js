export function getBootswatchLocal() {
    return {
        cerulan: 'http://localhost/saul/lib/bootswatch/cerulean/bootstrap.min.css',
        cosmo: 'http://localhost/saul/lib/bootswatch/cosmo/bootstrap.min.css',
        default: 'http://localhost/saul/lib/bootswatch/default/bootstrap.min.css',
        flatly: 'http://localhost/saul/lib/bootswatch/flatly/bootstrap.min.css',
        journal: 'http://localhost/saul/lib/bootswatch/journal/bootstrap.min.css',
        literia: 'http://localhost/saul/lib/bootswatch/literia/bootstrap.min.css',
        lux: 'http://localhost/saul/lib/bootswatch/lux/bootstrap.min.css',
        materia: 'http://localhost/saul/lib/bootswatch/materia/bootstrap.min.css',
        minty: 'http://localhost/saul/lib/bootswatch/minty/bootstrap.min.css',
        morph: 'http://localhost/saul/lib/bootswatch/morph/bootstrap.min.css',
        quartz: 'http://localhost/saul/lib/bootswatch/quartz/bootstrap.min.css',
        sandstone: 'http://localhost/saul/lib/bootswatch/sandstone/bootstrap.min.css',
        simplex: 'http://localhost/saul/lib/bootswatch/simplex/bootstrap.min.css' ,
        sketchy: 'http://localhost/saul/lib/bootswatch/sketchy/bootstrap.min.css',
        spacelab: 'http://localhost/saul/lib/bootswatch/spacelab/bootstrap.min.css',        
        superhero: 'http://localhost/saul/lib/bootswatch/superhero/bootstrap.min.css',
        united: 'http://localhost/saul/lib/bootswatch/united/bootstrap.min.css',
        yeti: 'http://localhost/saul/lib/bootswatch/yeti/bootstrap.min.css',
        zephyr: 'http://localhost/saul/lib/bootswatch/zephyr/bootstrap.min.css'
    };
}

export function getBootswatchProduccion() {
    return {
        cerulan: 'https://cdn.jsdelivr.net/npm/bootswatch@5/dist/cerulean/bootstrap.min.css',
        cosmo: 'https://cdn.jsdelivr.net/npm/bootswatch@5/dist/cosmo/bootstrap.min.css',
        default: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css',
        flatly: 'https://cdn.jsdelivr.net/npm/bootswatch@5.0.0/dist/flatly/bootstrap.min.css',
        journal: 'https://cdn.jsdelivr.net/npm/bootswatch@5.0.0/dist/journal/bootstrap.min.css',
        literia: 'https://cdn.jsdelivr.net/npm/bootswatch@5.0.0/dist/literia/bootstrap.min.css',
        lux: 'https://cdn.jsdelivr.net/npm/bootswatch@5.0.0/dist/lux/bootstrap.min.css',
        materia: 'https://cdn.jsdelivr.net/npm/bootswatch@5.0.0/dist/materia/bootstrap.min.css',
        minty: 'https://cdn.jsdelivr.net/npm/bootswatch@5.0.0/dist/minty/bootstrap.min.css',
        morph: 'https://cdn.jsdelivr.net/npm/bootswatch@5.0.0/dist/morph/bootstrap.min.css',
        quartz: 'https://cdn.jsdelivr.net/npm/bootswatch@5.0.0/dist/quartz/bootstrap.min.css',
        sandstone: 'https://cdn.jsdelivr.net/npm/bootswatch@5.0.0/dist/sandstone/bootstrap.min.css',
        simplex: 'https://cdn.jsdelivr.net/npm/bootswatch@5.0.0/dist/simplex/bootstrap.min.css' ,
        sketchy: 'https://cdn.jsdelivr.net/npm/bootswatch@5.0.0/dist/sketchy/bootstrap.min.css',
        spacelab: 'https://cdn.jsdelivr.net/npm/bootswatch@5.0.0/dist/spacelab/bootstrap.min.css',        
        superhero: 'https://cdn.jsdelivr.net/npm/bootswatch@5.0.0/dist/superhero/bootstrap.min.css',
        united: 'https://cdn.jsdelivr.net/npm/bootswatch@5.0.0/dist/united/bootstrap.min.css',
        yeti: 'https://cdn.jsdelivr.net/npm/bootswatch@5.0.0/dist/yeti/bootstrap.min.css',
        zephyr: 'https://cdn.jsdelivr.net/npm/bootswatch@5.0.0/dist/zephyr/bootstrap.min.css',        
    };
}

export function getTemasBootswatch() {
    return Object.keys( getBootswatchProduccion() );
}