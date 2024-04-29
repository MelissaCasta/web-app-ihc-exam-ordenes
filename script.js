let usuarioAutenticado = ''; // Variable para almacenar el nombre de usuario autenticado
let contraseñaAutenticada = ''; // Variable para almacenar la contraseña autenticada
let recognition; // Variable para almacenar el objeto de reconocimiento de voz

// Función para inicializar el reconocimiento de voz
function iniciarReconocimientoDeVoz() {
    // Verificar si el navegador soporta reconocimiento de voz
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.lang = 'es-ES'; // Establecer el idioma de reconocimiento de voz

        // Iniciar el reconocimiento de voz
        recognition.start();

        // Evento cuando la voz es detectada
        recognition.onresult = function(event) {
            const results = event.results;
            if (results && results.length > 0) {
                const transcript = results[0][0].transcript.toLowerCase(); // Obtener el texto reconocido y convertirlo a minúsculas

                // Verificar si se ha detectado la palabra "bajar"
                if (transcript.includes("bajar")) {
                    // Detener el reconocimiento de voz
                    recognition.stop();
                    // Iniciar el proceso de autenticación con un retraso de 3 segundos
                    setTimeout(autenticarUsuarioPorVoz, 5000);
                }
            }
        };

        // Evento de error
        recognition.onerror = function(event) {
            console.error('Error de reconocimiento de voz:', event.error);
        };
    } else {
        // Si no hay soporte para reconocimiento de voz
        console.error('El reconocimiento de voz no está soportado en este navegador.');
    }
}

// Función para autenticar al usuario por voz
function autenticarUsuarioPorVoz() {
    // Continuar el reconocimiento de voz
    recognition.start();

    // Variable para almacenar si se ha mencionado "bajar"
    let mencionoBajar = false;

    // Evento cuando la voz es detectada
    recognition.onresult = function (event) {
        const results = event.results;
        if (results && results.length > 0) {
            const transcript = results[0][0].transcript.toLowerCase(); // Obtener el texto reconocido y convertirlo a minúsculas

            // Verificar si se mencionó "bajar"
            if (transcript.includes("bajar")) {
                mencionoBajar = true;
            }

            // Definir usuarios y contraseñas
            const usuariosContraseñas = [
                { usuario: 'Melissa', contraseña: '2101' },
                { usuario: 'Diana', contraseña: '5779' }
            ];

            let credencialesCorrectas = false;

            // Verificar si la oración contiene cada usuario y su contraseña correspondiente
            for (const { usuario, contraseña } of usuariosContraseñas) {
                if (transcript.includes(usuario.toLowerCase()) && transcript.includes(contraseña.toLowerCase())) {
                    usuarioAutenticado = usuario;
                    contraseñaAutenticada = contraseña;
                    credencialesCorrectas = true;
                    break;
                }
            }

            // Verificar si se encontraron credenciales correctas y se mencionó "bajar"
            if (credencialesCorrectas && mencionoBajar) {
                mostrarResultadoAutenticacion("success", "Usuario autenticado: " + usuarioAutenticado);
                iniciarSesion(usuarioAutenticado); // Llamar a la función iniciarSesion con el usuario autenticado
            } else if (!mencionoBajar) {
                mostrarResultadoAutenticacion("danger", "Por favor, menciona la palabra 'bajar' para iniciar sesión.");
            } else {
                mostrarResultadoAutenticacion("danger", "Credenciales incorrectas. Inténtalo de nuevo. (Recarga la página)");
            }
        } else {
            console.log("No se detectaron resultados de voz.");
        }
    };
}

// Función para iniciar sesión
function iniciarSesion(usuario) {
    var contraseña = contraseñaAutenticada; // Obtener la contraseña autenticada

    if ((usuario === "Melissa" && contraseña === "2101") || (usuario === "Diana" && contraseña === "5779")) {
        // Almacenar el nombre de usuario en el almacenamiento local
        localStorage.setItem('usuario', usuario);
        window.location.href = "index.html";
    } else {
        mostrarResultadoAutenticacion("danger", "Usuario o contraseña incorrectos");
    }
}

// Función para mostrar el resultado de la autenticación
function mostrarResultadoAutenticacion(tipo, mensaje) {
    var resultadoAutenticacion = document.getElementById("resultadoAutenticacion");
    resultadoAutenticacion.innerHTML = `<div class="alert alert-${tipo}" role="alert">${mensaje}</div>`;
}

// Iniciar el reconocimiento de voz
iniciarReconocimientoDeVoz();
