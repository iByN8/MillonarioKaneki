var preguntas_faciles = []
var preguntas_medias = []
var preguntas_dificiles = []
var preguntas = []

var pregunta_actual = 0;
var preguntaArray = 0;
var respuestas=['R1','R2','R3','R4'];
var juegoIniciado = false;
var opcionesAbiertas = false;

function showOptions(){
    if(!opcionesAbiertas){
        document.getElementById("panelOpciones").style.display = "block";
        opcionesAbiertas = true;
    }else{
        document.getElementById("panelOpciones").style.display = "none";
        opcionesAbiertas = false;
    }

}

function clickInput(){
        document.getElementById("fileInput").click();
}

function comenzar(){
    var fileList = document.getElementById("fileInput").files;
    if (fileList.length>0) {
        inicializa_juego()
        document.getElementById("panelOpciones").style.display = "none";
        opcionesAbiertas = false;
    }

}

function reiniciar(){
    window.location.reload();
}

function handleFileChange(inputElement) {
    const file = inputElement.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const contenido = e.target.result;
        const lineas = contenido.split('\n');

        // Itera sobre las líneas del archivo
        for (let i = 0; i < lineas.length; i += 5) {
            // Obtén la pregunta y las respuestas
            const pregunta = [];
            pregunta.push(lineas[i]); // Agrega la pregunta
    
            for (let j = i + 1; j < i + 5; j++) {
                pregunta.push(lineas[j]); // Agrega las respuestas
            }
    
            // Agrega la pregunta y sus respuestas al array de correspondiente
            if (i < 6*5) {
                preguntas_faciles.push(pregunta);
            } else if (i >= 6*5 && i < 11*5) {
                preguntas_medias.push(pregunta);
            } else {
                preguntas_dificiles.push(pregunta);
            }
        } 
    };

    reader.readAsText(file);
}

function inicializa_juego(){
        console.log("iniciando juego")
        pregunta_actual = 0;
        preguntas = preguntas_faciles;
        shuffle(preguntas);
        mostrar_pregunta();  
};

function mostrar_pregunta() {
    juegoIniciado = true; 
    var contenedorPregunta = document.getElementById('pregunta');
    var respuestasContenedor = document.getElementsByClassName('respuesta');
    document.getElementById("f" + (pregunta_actual + 1)).style.backgroundColor = "yellow";

    // Decidir el conjunto de preguntas basado en el nivel de dificultad según el avance
    if (pregunta_actual == 5) {
        preguntas = preguntas_medias;
        shuffle(preguntas);
        preguntaArray = 0;
    } else if (pregunta_actual == 10) {
        preguntas = preguntas_dificiles;
        shuffle(preguntas);
        preguntaArray = 0;
    } 

    // Elegir la pregunta adecuada del array basado en el índice 'preguntaArray'
    var preguntaSeleccionada = preguntas[preguntaArray]; 
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
            pregunta_actual++;
            juegoIniciado = false;
            if(pregunta_actual<15){
            document.getElementById("flecha").style.display="block";

            }else{
                console.log("¡Enhorabuena! ¡Hoy es tu dia de suerte, te has vuelto millonario!")
            }

        } else {
            respuestaSeleccionada.style.backgroundColor = "red";
            document.getElementById("f" + (pregunta_actual + 1)).style.backgroundColor = "red";
            juegoIniciado = false;
            mostrarCorrecta();
            console.log("¡Has perdido, hoy no sera el dia de ser millonario!")
        }
    }
}

function mostrarCorrecta() {
    // Obtener todas las respuestas
    var respuestas = document.getElementsByClassName("respuesta");

    // Iterar sobre las respuestas
    for (var i = 0; i < respuestas.length; i++) {
        // Verificar si la respuesta es correcta
        if (respuestas[i].classList.contains("correcta")) {
            // Cambiar el fondo de la respuesta correcta a verde
            respuestas[i].style.backgroundColor = "green";
        }
    }
}

function respuestas_default(){
    var respuestasContenedor = document.getElementsByClassName('respuesta');
    for (var i = 0; i < respuestasContenedor.length; i++) {
        respuestasContenedor[i].style.backgroundColor = "";
    }
}

function siguiente_pregunta(){
    document.getElementById("flecha").style.display="none";
    preguntaArray++;
    undoComodin50();
    respuestas_default();
    mostrar_pregunta();
    if(!comodin){
        document.getElementById("comodinReroll").classList.add("comodinUsado");
    }
    if(!comodin_Publico){
        document.getElementById("comodinPublico").classList.add("comodinUsado");
    }
    if(!comodin_Llamada){
        document.getElementById("comodinLlamada").classList.add("comodinUsado");
    }
    if(!comodin_50){
        document.getElementById("comodin50").classList.add("comodinUsado");
    }
    
};

var comodin_Reroll = true;
var comodin_Publico = true;
var comodin_Llamada = true;
var comodin_50 = true;

function comodinReroll(){
    if(juegoIniciado){
    var boton = document.getElementById("comodinReroll");
    if(comodin_Reroll){
        boton.style.opacity = "0.5";
        comodin_Reroll = false;
        usarComodinReroll()
    }
}
}

function comodinPublico(){
    if(juegoIniciado){
    var boton = document.getElementById("comodinPublico");
    if(comodin_Publico){
        boton.style.opacity = "0.5";
        comodin_Publico = false;
    }else if(!boton.classList.contains("comodinUsado")){
        boton.style.opacity = "1";
        comodin_Publico = true;
    }
}
 
}
 
function comodinLlamada(){
    if(juegoIniciado){
    var boton = document.getElementById("comodinLlamada");
    if(comodin_Llamada){
        boton.style.opacity = "0.5";
        comodin_Llamada = false;
     }else if(!boton.classList.contains("comodinUsado")){
        boton.style.opacity = "1";
        comodin_Llamada = true;
     }
    }
}

function comodin50() {
    if(juegoIniciado){
    var boton = document.getElementById("comodin50");
    if(comodin_50){
        boton.style.opacity = "0.5";
        comodin_50 = false;
        usarComodin50();
     }else if(!boton.classList.contains("comodinUsado")){
        boton.style.opacity = "1";
        comodin_50 = true;
        undoComodin50();
     }
    }    
}

function usarComodin50() {
    var respuestas = document.getElementsByClassName("respuesta");
    var incorrectas = 0;

    for (var i = 0; i < respuestas.length; i++) {
        if (!respuestas[i].classList.contains("desactivada") && !respuestas[i].classList.contains("correcta")) {
            respuestas[i].classList.add("desactivada");
            incorrectas++;

            if (incorrectas === 2) {
                break;
            }
        }
    }
}

function undoComodin50() {
    var respuestas = document.getElementsByClassName("respuesta");

    for (var i = 0; i < respuestas.length; i++) {
        if (respuestas[i].classList.contains("desactivada")) {

            respuestas[i].classList.remove("desactivada");
        }
    }
}


function usarComodinReroll(){
    var contenedorPregunta = document.getElementById('pregunta');
    var respuestasContenedor = document.getElementsByClassName('respuesta');

    var preguntaSeleccionada = preguntas[5]; 
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