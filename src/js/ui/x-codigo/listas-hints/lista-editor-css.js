const hintsCSS = [
	{
        "text": `.clase {
    
}`,
        "displayText": "clase"
    },
    //pseudo elementos    
    {
        "text": `::first-line`,
        "displayText": "::first-line"
    },
    {
        "text": `::first-letter`,
        "displayText": "::first-letter"
    },
    {
        "text": `::first-line`,
        "displayText": "::first-line"
    },
    {
        "text": `::before`,
        "displayText": "::before"
    },
    {
        "text": `::after`,
        "displayText": "::after"
    },
    {
        "text": `::selection`,
        "displayText": "::selection"
    },
    //pseudo clases
    {
        "text": `:active`,
        "displayText": ":active"
    },
    {
        "text": `:checked`,
        "displayText": ":checked"
    },
    {
        "text": `:disabled`,
        "displayText": ":disabled"
    },
    {
        "text": `:empty`,
        "displayText": ":empty"
    },
    {
        "text": `:enabled`,
        "displayText": ":enabled"
    },
    {
        "text": `:first-child`,
        "displayText": ":first-child"
    },
    {
        "text": `:first-of-type`,
        "displayText": ":first-of-type"
    },
    {
        "text": `:focus`,
        "displayText": ":focus"
    },
    {
        "text": `:hover`,
        "displayText": ":hover"
    },
    {
        "text": `:in-range`,
        "displayText": ":in-range"
    },
    {
        "text": `:invalid`,
        "displayText": ":invalid"
    },
    {
        "text": `:last-child`,
        "displayText": ":last-child"
    },
    {
        "text": `:last-of-type`,
        "displayText": ":last-of-type"
    },
    {
        "text": `:link`,
        "displayText": ":link"
    },
    {
        "text": `:optional`,
        "displayText": ":optional"
    },
    {
        "text": `:out-of-range`,
        "displayText": ":out-of-range"
    },
    {
        "text": `:read-only`,
        "displayText": ":read-only"
    },
    {
        "text": `:read-write`,
        "displayText": ":read-write"
    },
    {
        "text": `:required`,
        "displayText": ":required"
    },
    {
        "text": `:root`,
        "displayText": ":root"
    },
    {
        "text": `:target`,
        "displayText": ":target"
    },
    {
        "text": `:valid`,
        "displayText": ":valid"
    },
    {
        "text": `:visited`,
        "displayText": ":visited"
    },
    //propiedades    
    {
        "text": `border: 2px solid yellow;`,
        "displayText": "border"
    },
    {
        "text": `width: 300px;`,
        "displayText": "width"
    },
    {
        "text": `height: 300px;`,
        "displayText": "height"
    },
    {
        "text": `background: red;`,
        "displayText": "background"
    },
    {
        "text": `transition: width 2s, height 4s;`,
        "displayText": "transition"
    },
    {
        "text": `transition-delay: 1s;`,
        "displayText": "transition-delay"
    },
    {
        "text": `@keyframes example {
    0%   {background-color:red;}
    25%  {background-color:yellow;}
    50%  {background-color:blue;}
    75%  {background-color:green;}
    100% {background-color:red;}
}`,
        "displayText": "keyframes"
    },
    //queries responsivos
    {
        "text": `@media screen and (max-width: 600px){}`,
        "displayText": "query celular"
    },
    {
        "text": `@media screen and (max-width: 900px){}`,
        "displayText": "query tablet"
    },
    {
        "text": `@media screen and (min-width: 901px){}`,
        "displayText": "query pc"
    }
];

let codigoBueno = '';

export function getHitsCss() {   
    return hintsCSS;
}