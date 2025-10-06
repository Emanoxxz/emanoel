// Usuários "salvos" em memória.
const usuarios = [
    { usuario: 'developer', senha: 'você' }
];

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

/**
 * Alterna a visibilidade de um campo de senha.
 * @param {string} inputId O ID do campo de input da senha.
 */
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling; // O ícone é o próximo elemento irmão

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


// Função de Login
function fazerLogin() {
    const usuarioInput = document.getElementById('login-usuario').value.trim();
    const senhaInput = document.getElementById('login-senha').value.trim();

    if (!usuarioInput || !senhaInput) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const usuarioEncontrado = usuarios.find(u => u.usuario === usuarioInput && u.senha === senhaInput);

    if (usuarioEncontrado) {
        // -----> MUDANÇA IMPORTANTE AQUI <-----
        // Redireciona para a página de início após o login
        window.location.href = 'inicio.html';
    } else {
        alert('Usuário ou senha incorretos.');
    }
}

// Função de Cadastro
function fazerCadastro() {
    const usuarioInput = document.getElementById('cadastro-usuario').value.trim();
    const senhaInput = document.getElementById('cadastro-senha').value.trim();

    if (!usuarioInput || !senhaInput) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const usuarioExistente = usuarios.some(u => u.usuario === usuarioInput);

    if (usuarioExistente) {
        alert('Este nome de usuário já está em uso. Por favor, escolha outro.');
    } else {
        usuarios.push({ usuario: usuarioInput, senha: senhaInput });
        alert('Cadastro realizado com sucesso! Agora você já pode fazer o login.');
        console.log('Usuários cadastrados:', usuarios);
        mostrarLogin();
        // Limpa os campos do formulário de cadastro após o sucesso
        document.getElementById('cadastro-usuario').value = '';
        document.getElementById('cadastro-senha').value = '';
    }
}
