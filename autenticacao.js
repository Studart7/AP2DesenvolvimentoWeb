function verificarSenha() {
    const senhaDigitada = document.getElementById('senha').value;
    const senhaCorreta = 'gabarito';
    const token = 'TokenDaSenha'; 

    if (md5(senhaDigitada) === md5(senhaCorreta)) {
        localStorage.setItem('token', token);
        window.location.href = 'principal.html';
    } else {
        document.getElementById('mensagemErro').textContent = 'Senha incorreta. Tente novamente.';
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default form submission
        verificarSenha();
    }
}
