$(document).ready(function () {
    let state = 'inicial'; 
    let timeout;
    let startTime;

    // Evento principal 
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

    // Espera
    function startWaitState() {
        state = 'wait';
        $('#screen').removeClass().addClass('wait');
        $('#message').text('Espera a que la pantalla se ponga roja...');

        let randomTime = Math.floor(Math.random() * 3000) + 1000; 

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

    // Activo 
    function startActiveState() {
        state = 'active';
        $('#screen').removeClass().addClass('active');
        $('#message').text('¡Haz clic ahora!');
        startTime = $.now(); 
    }

    // Fin
    function endActiveState() {
        let reactionTime = $.now() - startTime;
        state = 'result';
        $('#screen').removeClass().addClass('inicial');
        $('#message').text('Haz clic para intentarlo de nuevo.');
        $('#result').text(`Tu tiempo de reacción fue: ${reactionTime} ms`);
    }

    // Reiniciar 
    function resetGame() {
        state = 'inicial';
        $('#result').text('');
        $('#message').text('Haz clic para empezar');
    }
});
