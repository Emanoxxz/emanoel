// --- LÓGICA DO BANCO DE DADOS LOCAL (localStorage) ---
function getUsuariosDB() {
    const usuariosString = localStorage.getItem('usuarios');
    if (!usuariosString) { return [{ usuario: 'developer', senha: 'você', fullname: 'Desenvolvedor', email: 'dev@aistation.com' }]; }
    return JSON.parse(usuariosString);
}

function saveUsuariosDB(usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

let usuarios = getUsuariosDB();
saveUsuariosDB(usuarios);

// --- LÓGICA DAS NOTIFICAÇÕES ---
function showNotification(message, type) {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    container.appendChild(notification);
    setTimeout(() => { notification.remove(); }, 5500); 
}

const loginForm = document.getElementById('login-form');
const cadastroForm = document.getElementById('cadastro-form');

function mostrarCadastro() { loginForm.classList.add('hidden'); cadastroForm.classList.remove('hidden'); }
function mostrarLogin() { cadastroForm.classList.add('hidden'); loginForm.classList.remove('hidden'); }

function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling;
    if (input.type === 'password') { input.type = 'text'; icon.classList.remove('fa-eye'); icon.classList.add('fa-eye-slash');
    } else { input.type = 'password'; icon.classList.remove('fa-eye-slash'); icon.classList.add('fa-eye'); }
}

function fazerLogin() {
    const usuarioInput = document.getElementById('login-usuario').value.trim();
    const senhaInput = document.getElementById('login-senha').value.trim();
    usuarios = getUsuariosDB();

    if (!usuarioInput || !senhaInput) { showNotification('Por favor, preencha todos os campos.', 'error'); return; }

    const usuarioEncontrado = usuarios.find(u => u.usuario === usuarioInput && u.senha === senhaInput);

    if (usuarioEncontrado) {
        sessionStorage.setItem('loggedUser', usuarioInput);
        const capitalizedUser = usuarioInput.charAt(0).toUpperCase() + usuarioInput.slice(1);
        showNotification(`Bem-vindo, ${capitalizedUser}!`, 'success');
        setTimeout(() => { window.location.href = 'inicio.html'; }, 2500);
    } else { showNotification('Usuário ou senha incorretos.', 'error'); }
}

function fazerCadastro() {
    const usuarioInput = document.getElementById('cadastro-usuario').value.trim();
    const senhaInput = document.getElementById('cadastro-senha').value.trim();
    usuarios = getUsuariosDB();

    if (!usuarioInput || !senhaInput) { showNotification('Por favor, preencha todos os campos.', 'error'); return; }
    
    const usuarioExistente = usuarios.some(u => u.usuario === usuarioInput);

    if (usuarioExistente) {
        showNotification('Este nome de usuário já está em uso.', 'error');
    } else {
        // NOVO FORMATO DE USUÁRIO COM CAMPOS EXTRAS
        const novoUsuario = {
            usuario: usuarioInput,
            senha: senhaInput,
            fullname: '', // Campo para nome completo
            email: ''     // Campo para email
        };
        usuarios.push(novoUsuario);
        saveUsuariosDB(usuarios); 
        
        showNotification('Cadastro realizado com sucesso!', 'success');
        mostrarLogin();
        document.getElementById('cadastro-form').reset();
    }
}