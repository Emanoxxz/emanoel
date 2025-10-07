// --- LÓGICA DO BANCO DE DADOS LOCAL (localStorage) ---
function getUsuariosDB() {
    const usuariosString = localStorage.getItem('usuarios');
    if (!usuariosString) {
        return [{ usuario: 'developer', senha: 'você' }];
    }
    return JSON.parse(usuariosString);
}

function saveUsuariosDB(usuarios) {
    const usuariosString = JSON.stringify(usuarios);
    localStorage.setItem('usuarios', usuariosString);
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
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

const loginForm = document.getElementById('login-form');
const cadastroForm = document.getElementById('cadastro-form');

// Funções para alternar entre os formulários
function mostrarCadastro() {
    loginForm.classList.add('hidden');
    cadastroForm.classList.remove('hidden');
}

function mostrarLogin() {
    cadastroForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
}

// Função para alternar visibilidade da senha
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling;
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Função de Login (com notificações)
function fazerLogin() {
    const usuarioInput = document.getElementById('login-usuario').value.trim();
    const senhaInput = document.getElementById('login-senha').value.trim();
    usuarios = getUsuariosDB();

    if (!usuarioInput || !senhaInput) {
        showNotification('Por favor, preencha todos os campos.', 'error');
        return;
    }

    const usuarioEncontrado = usuarios.find(u => u.usuario === usuarioInput && u.senha === senhaInput);

    if (usuarioEncontrado) {
        // Salva o nome do usuário logado na sessionStorage para usar na outra página
        sessionStorage.setItem('loggedUser', usuarioInput);
        
        showNotification(`Bem-vindo, ${usuarioInput}!`, 'success');
        setTimeout(() => {
            window.location.href = 'inicio.html';
        }, 1000);
    } else {
        showNotification('Usuário ou senha incorretos.', 'error');
    }
}

// Função de Cadastro (com notificações)
function fazerCadastro() {
    const usuarioInput = document.getElementById('cadastro-usuario').value.trim();
    const senhaInput = document.getElementById('cadastro-senha').value.trim();
    usuarios = getUsuariosDB();

    if (!usuarioInput || !senhaInput) {
        showNotification('Por favor, preencha todos os campos.', 'error');
        return;
    }
    
    const usuarioExistente = usuarios.some(u => u.usuario === usuarioInput);

    if (usuarioExistente) {
        showNotification('Este nome de usuário já está em uso.', 'error');
    } else {
        usuarios.push({ usuario: usuarioInput, senha: senhaInput });
        saveUsuariosDB(usuarios); 
        
        showNotification('Cadastro realizado com sucesso!', 'success');
        console.log('Usuários salvos no localStorage:', getUsuariosDB());
        mostrarLogin();
        
        document.getElementById('cadastro-form').reset();
    }
}
