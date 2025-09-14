(() => {
    'use strict';
    const injectStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                bottom: -100px;
                left: 50%;
                transform: translateX(-50%);
                padding: 16px 30px;
                border-radius: 50px;
                color: #fff;
                font-weight: 600;
                z-index: 9999;
                transition: bottom 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                background: rgba(2, 62, 138, 0.5);
                border: 1px solid rgba(255, 255, 255, 0.2);
                backdrop-filter: blur(10px);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            }
            .notification.show {
                bottom: 40px;
            }
            .notification.success {
                background: rgba(0, 180, 216, 0.5);
            }
            .notification.error {
                background: rgba(229, 56, 59, 0.5);
            }
            .input-error {
                border-color: #e5383b !important;
                box-shadow: 0 0 15px #e5383b !important;
            }
            .error-message {
                color: #e5383b;
                font-size: 14px;
                text-align: left;
                width: 100%;
                padding-left: 25px;
                /* LA CORRECCIÓN: Se ajusta el margen para dar espacio. */
                margin-top: 8px; 
                margin-bottom: 5px;
                opacity: 0;
                transform: translateY(-10px);
                animation: fade-in-error 0.3s forwards;
            }
            @keyframes fade-in-error {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    };

    // --- EL NEXO: EJECUCIÓN POST-CARGA DEL DOM ---
    document.addEventListener('DOMContentLoaded', () => {
        injectStyles(); // Inyectamos los estilos corregidos

        // --- SELECCIÓN DE MIEMBROS VITALES ---
        const container = document.getElementById('container');
        const registerBtn = document.getElementById('register');
        const loginBtn = document.getElementById('login');
        const registerForm = document.getElementById('registerForm');
        const loginForm = document.getElementById('loginForm');
        const allButtons = document.querySelectorAll('button');

        // --- VERIFICACIÓN DE LA EXISTENCIA ---
        if (!container || !registerBtn || !loginBtn || !registerForm || !loginForm) {
            console.error("Error: Faltan elementos esenciales del DOM.");
            return;
        }

        // --- REFLEJOS CONDICIONADOS (ANIMACIÓN) ---
        registerBtn.addEventListener('click', () => container.classList.add("active"));
        loginBtn.addEventListener('click', () => container.classList.remove("active"));
        
        // --- LA CONCIENCIA DEL VÓRTICE ---
        const trackVortex = (event) => {
            const rect = container.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            container.style.setProperty('--mouse-x', `${x}px`);
            container.style.setProperty('--mouse-y', `${y}px`);
        };
        container.addEventListener('mousemove', trackVortex);

        // --- EL ALMA DEL PÚLSAR (ANIMACIÓN DE BOTONES) ---
        allButtons.forEach(button => {
            button.addEventListener('mousedown', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                button.style.setProperty('--pulse-x', `${x}px`);
                button.style.setProperty('--pulse-y', `${y}px`);
            });
        });

        // --- SISTEMA DE NOTIFICACIÓN ---
        const showNotification = (message, type = 'success') => {
            document.querySelectorAll('.notification').forEach(n => n.remove());
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            document.body.appendChild(notification);
            requestAnimationFrame(() => {
                notification.classList.add('show');
            });
            setTimeout(() => {
                notification.classList.remove('show');
                notification.addEventListener('transitionend', () => notification.remove());
            }, 3000);
        };

        // --- LÓGICA DE VALIDACIÓN ---
        const validateForm = (form) => {
            let isValid = true;
            form.querySelectorAll('.error-message').forEach(el => el.remove());
            form.querySelectorAll('input').forEach(input => {
                input.classList.remove('input-error');
            });

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            const inputs = form.querySelectorAll('input[required]');
            inputs.forEach(input => {
                let error = null;
                if (!input.value.trim()) {
                    error = 'Este campo es obligatorio.';
                } else if (input.type === 'email' && !emailRegex.test(input.value)) {
                    error = 'Por favor, introduce un email válido.';
                } else if (input.type === 'password' && input.value.length < 8) {
                    error = 'La contraseña debe tener al menos 8 caracteres.';
                }

                if (error) {
                    isValid = false;
                    input.classList.add('input-error');
                    const errorElement = document.createElement('div');
                    errorElement.className = 'error-message';
                    errorElement.textContent = error;
                    input.parentElement.appendChild(errorElement);
                }
            });
            
            return isValid;
        };

        // --- MANEJO DE FORMULARIOS ---
        const handleFormSubmit = (event) => {
            event.preventDefault();
            const form = event.target;

            if (validateForm(form)) {
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                const formType = form.id === 'registerForm' ? 'Registro' : 'Inicio de Sesión';

                console.log(`--- Intento de ${formType} ---`);
                console.log("Datos validados:", data);
                
                showNotification(`${formType} exitoso. Datos en consola.`, 'success');
                form.reset();
            } else {
                showNotification('Ingresa correctamente los datos.', 'error');
            }
        };
        
        registerForm.addEventListener('submit', handleFormSubmit);
        loginForm.addEventListener('submit', handleFormSubmit);
    });
})();
