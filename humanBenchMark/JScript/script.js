document.addEventListener('DOMContentLoaded', () => {
    let state = 'initial';
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

    // Espera
    function startWaitState() {
        state = 'wait';
        screen.className = 'wait';
        message.textContent = 'Espera a que la pantalla se ponga roja...';

        let randomTime = Math.floor(Math.random() * 3000) + 1000; 
        timeout = setTimeout(startActiveState, randomTime);
    }

    // Clic antes de tiempo
    function earlyClick() {
        clearTimeout(timeout);
        state = 'result';
        screen.className = 'initial';
        message.textContent = '¡Demasiado pronto! Haz clic para intentarlo de nuevo.';
    }

    // Activo
    function startActiveState() {
        state = 'active';
        screen.className = 'active';
        message.textContent = '¡Haz clic ahora!';
        startTime = Date.now(); 
    }

    // Fin
    function endActiveState() {
        let reactionTime = Date.now() - startTime;
        state = 'result';
        screen.className = 'initial';
        message.textContent = 'Haz clic para intentarlo de nuevo.';
        result.textContent = `Tu tiempo de reacción fue: ${reactionTime} ms`;
    }

    // Reiniciar
    function resetGame() {
        state = 'initial';
        result.textContent = '';
        message.textContent = 'Haz clic para empezar';
    }
});
