window.addEventListener('load', function() {
        const botonLogin = document.querySelector('.btn-login');
        
        if (botonLogin) {
            if (localStorage.getItem('estaLogueado') === 'true') {
                // Modificamos esta línea:
                botonLogin.textContent = "Kevin (Cerrar Sesion)"; 
                botonLogin.setAttribute('href', '#');  
                
                botonLogin.onclick = function() {
                    localStorage.removeItem('estaLogueado');
                    window.location.href = 'Index.html';
                };
            } else {
                botonLogin.textContent = "Iniciar Sesión";
                botonLogin.setAttribute('href', 'inicioSesion.html');
            }
        }
    });