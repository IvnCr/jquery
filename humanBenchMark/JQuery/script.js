$(document).ready(function () {
    let state = 'inicial'; 
    let timeout;
    let startTime;

    // Evento principal para manejar clics en el #screen
    $('#screen').on('click', function () {
        if (state === 'inicial') {
            startWaitState();
        } else if (state === 'wait') {
            earlyClick();
        } else if (state === 'active') {
            endActiveState();
        } else if (state === 'result') {
            resetGame();
        }
    });

    // Estado de espera (wait)
    function startWaitState() {
        state = 'wait';
        $('#screen').removeClass().addClass('wait');
        $('#message').text('Espera a que la pantalla se ponga roja...');

        let randomTime = Math.floor(Math.random() * 3000) + 1000; // Entre 1 y 4 segundos

        timeout = setTimeout(function () {
            startActiveState();
        }, randomTime);
    }

    // Clic antes de tiempo
    function earlyClick() {
        clearTimeout(timeout);
        state = 'result';
        $('#screen').removeClass().addClass('inicial');
        $('#message').text('¡Demasiado pronto! Haz clic para intentarlo de nuevo.');
    }

    // Estado activo (active)
    function startActiveState() {
        state = 'active';
        $('#screen').removeClass().addClass('active');
        $('#message').text('¡Haz clic ahora!');
        startTime = $.now(); // Capturamos el tiempo actual en milisegundos
    }

    // Fin del estado activo (calculamos tiempo de reacción)
    function endActiveState() {
        let reactionTime = $.now() - startTime; // Tiempo en milisegundos
        state = 'result';
        $('#screen').removeClass().addClass('inicial');
        $('#message').text('Haz clic para intentarlo de nuevo.');
        $('#result').text(`Tu tiempo de reacción fue: ${reactionTime} ms`);
    }

    // Reiniciar juego
    function resetGame() {
        state = 'inicial';
        $('#result').text('');
        $('#message').text('Haz clic para empezar');
    }
});
