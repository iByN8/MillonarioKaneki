var preguntas_faciles = []
var preguntas_medias = []
var preguntas_dificiles = []

var pregunta_actual = 0;
var respuestas=['R1','R2','R3','R4'];
var juegoIniciado = false;
var archivosCargados = false;


function inicializa_juego(){
    console.log("iniciando juego")
    document.getElementById("opciones").style.display = "none";
    pregunta_actual = 0;
    mostrar_pregunta();
    juegoIniciado = true;  
};

function cargar_preguntas(){

}

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
            document.getElementById("flecha").style.display="block";
            juegoIniciado = false;

        } else {
            respuestaSeleccionada.style.backgroundColor = "red";
            document.getElementById("f" + (pregunta_actual + 1)).style.backgroundColor = "red";
            juegoIniciado = false;
        }
    }
}

function handleDropdownChange(selectElement) {
    const selectedValue = selectElement.value;
    if (selectedValue === "comenzar" && archivosCargados) {
        inicializa_juego();
    } else if (selectedValue === "fileInput") {
        document.getElementById("fileInput").click();
        selectElement.value = "opcion"
        if (document.getElementById("fileInput").files) {
            archivosCargados = true;
        }
    }
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
            if (i < 5) {
                preguntas_faciles.push(pregunta);
            } else if (i >= 5 && i < 10) {
                preguntas_medias.push(pregunta);
            } else {
                preguntas_dificiles.push(pregunta);
            }
        } 
    };

    reader.readAsText(file);
}

function siguiente_pregunta(){
    document.getElementById("flecha").style.display="none";
};
 