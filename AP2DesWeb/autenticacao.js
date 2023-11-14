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
