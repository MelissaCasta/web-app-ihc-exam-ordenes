document.addEventListener("DOMContentLoaded", function () {
  const startRecognitionButton = document.getElementById("startRecognition");
  const resultOutput = document.getElementById("result");
  const usuarioElement = document.getElementById("usuario");
    
let textC = ''; //Variable que guardará el comando detectado

const usuario = localStorage.getItem('usuario');
usuarioElement.textContent = usuario ? usuario : 'Invitado';

// Verificar si el navegador soporta reconocimiento de voz
if (!('webkitSpeechRecognition' in window)) {
  // Deshabilitar el botón si el navegador no soporta el reconocimiento de voz
  startRecognitionButton.disabled = true;
  // Mostrar un mensaje de error al usuario
  resultOutput.textContent = "Su navegador no soporta el reconocimiento de voz.";
} else {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false; // El reconocimiento no es continuo
    recognition.interimResults = false; // No se muestran resultados intermedios
    recognition.lang = "es-ES"; // Establecer el idioma del reconocimiento

    // Evento cuando se inicia el reconocimiento de voz
    recognition.onstart = function() {
      startRecognitionButton.textContent = "Escuchando...";
    };
    // Evento en caso de error durante el reconocimiento de voz
    recognition.onerror = function(event) {
      startRecognitionButton.textContent = "Comenzar Reconocimiento";
      resultOutput.textContent = "Error durante el reconocimiento: " + event.error;
    };

    recognition.onend = function() {
      startRecognitionButton.textContent = "Comenzar Reconocimiento";
    };

    // Evento cuando la voz es detectada
    recognition.onresult = function(event) {
        const result = event.results[0][0].transcript;
        resultOutput.textContent = "La orden identificada es: " + result;
        textC = result.toLowerCase();

        // Procesar diferentes comandos según el texto reconocido
        if (result.includes("enciende la recámara")) {
          console.log("Recámara Encendida.");
          enviarDatos(textC);
        } else 
        
        if (result.includes("apaga la recámara")) {
          console.log("Recámara Apagada.");
          enviarDatos(textC);
        } else 
        
        if (result.includes("enciende la sala")) {
          console.log("Sala Encendida")
          enviarDatos(textC);
        } else 
        
        if (result.includes("apaga la sala")) {
          console.log("Sala Apagada.");
          enviarDatos(textC);
        } else 
        
        if (result.includes("enciende el jardín")) {
          console.log("Jardín encendido");
          enviarDatos(textC);
        } else 
        
        if (result.includes("apaga el jardín")) {
          console.log("Jardín Apagado");
          enviarDatos(textC);
        } else 
        
        if (result.includes("enciende el ventilador")) {
          console.log("Ventilador Encendido");
          enviarDatos(textC);
        }
        if (result.includes("apagar el ventilador")) {
          console.log("Ventilador Apagado");
          enviarDatos(textC);
        } else 
        
        if (result.includes("abrir las cortinas")) {
          console.log("Cortinas Abiertas");
          enviarDatos(textC);
        } else 

        if (result.includes("cierra las cortinas")) {
          console.log("Cortinas Cerradas");
          enviarDatos(textC);
        } else 
        
        if (result.includes("activa la alarma")) {
          console.log("Alarma Activada");
          enviarDatos(textC);
        } else 

        if (result.includes("desactiva la alarma")) {
          console.log("Alarma Desactivada");
          enviarDatos(textC);
        } else
          
          if (result.includes("Desactiva la alarma")) {
          console.log("Alarma Desactivada");
          enviarDatos(textC);
        } else

        if (result.includes("enciende las cámaras")) {
          console.log("Cámaras Encendidas");
          enviarDatos(textC);
        } else 

        if (result.includes("apaga las cámaras")) {
          console.log("Cámaras Apagadas");
          enviarDatos(textC);
        } else

        if (result.includes("enciende la cámara uno")) {
          console.log("Cámara Uno Encendida");
          enviarDatos(textC);
        } else 

        if (result.includes("apaga la cámara uno")) {
          console.log("Cámara Uno Apagada");
          enviarDatos(textC);
        } else

        if (result.includes("enciende la cámara dos")) {
          console.log("Cámara Dos Encendida");
          enviarDatos(textC);
        } else 

        if (result.includes("apaga la cámara dos")) {
          console.log("Cámara Dos Apagada");
          enviarDatos(textC);
        } else

        if (result.includes("enciende la cámara tres")) {
          console.log("Cámara Tres Apagada");
          enviarDatos(textC);
        } else
        
        if (result.includes("apaga la cámara tres")) {
          console.log("Cámara Tres Apagada");
          enviarDatos(textC);
        }
        
        if (result.includes("enciende la cámara 3")) {
          console.log("Cámara Tres Apagada");
          enviarDatos(textC);
        } else
        
        if (result.includes("apaga la cámara 3")) {
          console.log("Cámara Tres Apagada");
          enviarDatos(textC);
        }

        function enviarDatos(textoCom) {
          const apiUrl = "https://662ee83443b6a7dce30dfb95.mockapi.io/comando";
          // Obtener la fecha y hora actual
          const fechaHoraActual = new Date();

          // Obtener las partes individuales de la fecha y hora
          const dia = fechaHoraActual.getDate();
          const mes = fechaHoraActual.getMonth() + 1; // Sumamos 1 porque los meses van de 0 a 11 en JavaScript
          const año = fechaHoraActual.getFullYear();
          const hora = fechaHoraActual.getHours();
          const minutos = fechaHoraActual.getMinutes();
          const segundos = fechaHoraActual.getSeconds();

          // Formatear las partes en el formato deseado
          const fechaFormateada = `${dia}/${mes}/${año}`;
          const horaFormateada = `${hora}:${minutos}:${segundos}`;
          const fechaHoraFormateada = `${fechaFormateada}, ${horaFormateada}`;

          const datos = {
              comando: textoCom,
              usuario: usuario, // Puedes cambiar esto según el usuario real
              fecha: fechaHoraFormateada // Obtener la fecha y hora actual
          };
      
          const options = {
              method: 'POST', // Método HTTP POST para enviar los datos
              headers: {
                  'Content-Type': 'application/json' // Especificar el tipo de contenido JSON
              },
              body: JSON.stringify(datos) // Convertir el objeto a JSON
          };
      
          fetch(apiUrl, options)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Ocurrió un error al enviar los datos a la API.');
              }
              return response.json();
          })
          .then(data => {
              console.log(data);
          })
          .catch(error => {
              console.error('Error al enviar los datos a la API:', error);
          });
      }
      
    };

    // Evento de error
    recognition.onerror = function(event) {
        console.error('Error de reconocimiento de voz:', event.error);
    };

    // Palabra clave para iniciar el reconocimiento de voz
    const activationKeyword = 'bajar';

    // Iniciar el reconocimiento de voz cuando se detecta la palabra clave
    recognition.onstart = function() {
        console.log("Reconocimiento activado");
    };

    // Detectar la palabra clave y activar el reconocimiento de voz
    recognition.onend = function() {
        recognition.start();
    };

    // Iniciar el reconocimiento de voz
    recognition.start();
} 

});
