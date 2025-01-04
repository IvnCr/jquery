document.addEventListener('DOMContentLoaded', () => {
    let state = 'initial'; // Estados: initial, wait, active, result
    let timeout;
    let startTime;

    const screen = document.getElementById('screen');
    const message = document.getElementById('message');
    const result = document.getElementById('result');

    screen.addEventListener('click', () => {
        if (state === 'initial') {
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
        screen.className = 'wait';
        message.textContent = 'Espera a que la pantalla se ponga roja...';

        let randomTime = Math.floor(Math.random() * 3000) + 1000; // Entre 1 y 4 segundos
        timeout = setTimeout(startActiveState, randomTime);
    }

    // Clic antes de tiempo
    function earlyClick() {
        clearTimeout(timeout);
        state = 'result';
        screen.className = 'initial';
        message.textContent = '¡Demasiado pronto! Haz clic para intentarlo de nuevo.';
    }

    // Estado activo (active)
    function startActiveState() {
        state = 'active';
        screen.className = 'active';
        message.textContent = '¡Haz clic ahora!';
        startTime = Date.now(); // Capturamos el tiempo actual en milisegundos
    }

    // Fin del estado activo (calculamos tiempo de reacción)
    function endActiveState() {
        let reactionTime = Date.now() - startTime; // Tiempo en milisegundos
        state = 'result';
        screen.className = 'initial';
        message.textContent = 'Haz clic para intentarlo de nuevo.';
        result.textContent = `Tu tiempo de reacción fue: ${reactionTime} ms`;
    }

    // Reiniciar juego
    function resetGame() {
        state = 'initial';
        result.textContent = '';
        message.textContent = 'Haz clic para empezar';
    }
});
