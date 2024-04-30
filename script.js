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

//Variables para llevar el estado actual
var pregunta_actual = 0;
var respuestas=['R1','R2','R3','R4'];
var juegoIniciado = false;


function inicializa_juego(){
    document.getElementById("iniciar").style.display = "none";
    pregunta_actual = 0;
    mostrar_pregunta();
    juegoIniciado = true;
};

function mostrar_pregunta() {
    var contenedorPregunta = document.getElementById('pregunta');
    var respuestasContenedor = document.getElementsByClassName('respuesta');
    var preguntas;

    // Decidir el conjunto de preguntas basado en el nivel de dificultad según el avance
    if (pregunta_actual < 5) {
        preguntas = preguntas_faciles;
    } else if (pregunta_actual >= 5 && pregunta_actual < 10) {
        preguntas = preguntas_medias;
    } else {
        preguntas = preguntas_dificiles;
    }

    // Elegir la pregunta adecuada del array basado en el índice 'pregunta_actual'
    var preguntaSeleccionada = preguntas[pregunta_actual % preguntas.length]; // Usar módulo para ciclar preguntas si fuera necesario
    contenedorPregunta.textContent = preguntaSeleccionada[0]; // Mostrar la pregunta

    var letras = ['A)', 'B)', 'C)', 'D)'];
    var vector = [0, 1, 2, 3];
    var vectorBarajado = shuffle(vector);

    // Asignar respuestas a los botones y remover la clase 'correcta'
    for (var i = 0; i < respuestasContenedor.length; i++) {
        respuestasContenedor[vectorBarajado[i]].textContent = letras[vectorBarajado[i]] + ' ' +preguntaSeleccionada[i + 1];
        respuestasContenedor[vectorBarajado[i]].classList.remove('correcta');
        if (i === 0) {
            respuestasContenedor[vectorBarajado[i]].classList.add('correcta'); // Marcar la respuesta correcta aleatoriamente
        }
    }
 
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function revisa_si_correcta(r) {
    if(juegoIniciado){
        var respuestaSeleccionada = document.getElementById(r); // Obtener el elemento de la respuesta seleccionada por su ID
        var esCorrecta = respuestaSeleccionada.classList.contains('correcta'); // Verificar si la respuesta seleccionada tiene la clase 'correcta'

        if (esCorrecta) {
            respuestaSeleccionada.style.backgroundColor = "green";
            document.getElementById("f" + (pregunta_actual + 1)).style.backgroundColor = "green"; 
            mostrarFlecha();
            juegoIniciado = false;

        } else {
            respuestaSeleccionada.style.backgroundColor = "red";
            document.getElementById("f" + (pregunta_actual + 1)).style.backgroundColor = "red";
            juegoIniciado = false;
        }
    }
}
function mostrarFlecha() {
   
}


function cambia_pregunta(){
    
};
