var preguntas_faciles=[
    ['¿Cómo se declara una variable en javascript?','var i=0;','i=0','int i=0;','$i=0;'],
    ['¿Como se llama el creador de C?','Dennis Ritchie','Brian Kernighan','Alan Turing','Freddy Mercury'],
];
var preguntas_medias=[
    ['¿En que año nacio James Gosling?','19 de mayo de 1955','24 de abril de 1992','9 de julio de 1765','31 de febrero 2015','22 de diciembre 1956'],
    ['¿Que famoso personaje y desarrollador, que actualmente trabaja en Dropbox nació un 31 de enero de 1956?','Guido van Rossum','Larry Page','Mark Zuckerberg','Patrick Volkerding']
];
var preguntas_dificiles=[
    ['¿Cual es el bus real de una memoria que reporta PC-10600?','667Mhz','533Mhz','400Mhz','10600Mhz'],
    ['¿Cuantas líneas de código tenía la primera version del kernel de Linux (ver 1.0.0)?','176,250','1,800,847','176,240','176,260']
];
//ToDo Agregar más preguntas!!!
//Arreglo con los premios
var cantidades=[100,200,300,500,1000,2000,4000,8000,16000,32000,64000,125000,250000,500000,1000000];

//Variables para llevar el estado actual
var premio_actual=null;
var pregunta_actual=null;
var respuestas=['R1','R2','R3','R4'];
var preguntas=[1,2];//3,4,5,]
var ps=null;

//Funciones auxiliares copiadas de Internet
//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
return o;
};			

function cambia_pregunta(){
    //"Shufflea" las respuestas
    var resp=shuffle(respuestas);
    
    if(pregunta_actual==0 | pregunta_actual==5 | pregunta_actual==10)
        ps=shuffle(preguntas);
    
    if(pregunta_actual<5){
        //Cambiar pregunta
        
        $('#pregunta').html(preguntas_faciles[ps[pregunta_actual]][0])
        //Reset a la clase correcta en todas las preguntas
        $('.respuesta').removeClass('correcta');
        $('#'+resp[0]).html(preguntas_faciles[ps[pregunta_actual]][1])
        $('#'+resp[1]).html(preguntas_faciles[ps[pregunta_actual]][2])
        $('#'+resp[2]).html(preguntas_faciles[ps[pregunta_actual]][3])
        $('#'+resp[3]).html(preguntas_faciles[ps[pregunta_actual]][4])
        $('#'+resp[0]).addClass('correcta');
    }
    
    //Aqui poner codigo para las otras 2 categorias de preguntas
    
    pregunta_actual+=1;
};

function revisa_si_correcta(r){
    var acerto=$("#"+r).hasClass('correcta');
    if(acerto){
            alert("Correcto!");
            $("#premio").html(cantidades[pregunta_actual-1]);
        }
    else{
        var premio=0;
        if(pregunta_actual>5)
            premio=1000;
        if(pregunta_actual>10)
            premio=32000;
        if(premio==0){
            alert("Respuesta incorrecta. Perdiste.\nDa Click en aceptar para empezar de nuevo.");
            inicializa_juego();
        }
        else{
            alert("Respuesta incorrecta. Perdiste. Pero te llevas un premio de: $"+premio+".Da Click en aceptar para empezar de nuevo.");
        }
    }
};

function inicializa_juego(){
    document.getElementById("iniciar").style.visibility = false;
};

function pregunta1(){
    document.getElementById("resp1").style.backgroundColor = "red";
}

function pregunta2(){
    document.getElementById("resp2").style.backgroundColor = "green";
}

function pregunta3(){
    document.getElementById("resp3").style.filter = "grayscale(75%)"
}