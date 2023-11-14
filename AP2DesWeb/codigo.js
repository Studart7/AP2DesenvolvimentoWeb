document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');

    if (!token) {  //Ve se o token está no local storage, se n tiver volta pro login
        window.location.href = 'index.html';
    }

    const body = document.body;

    const div_filtro = document.createElement('div');
    div_filtro.id = 'filtros';

    body.appendChild(div_filtro);

    const btn_feminino = criarBotao('FEMININO', 'https://botafogo-atletas.mange.li/feminino');
    const btn_masculino = criarBotao('MASCULINO', 'https://botafogo-atletas.mange.li/masculino');  //Os filtros com os endpoints pedidos
    const btn_todos = criarBotao('TODOS', 'https://botafogo-atletas.mange.li/all');

    div_filtro.appendChild(btn_feminino);
    div_filtro.appendChild(btn_masculino);
    div_filtro.appendChild(btn_todos);

    const div_container = document.createElement('div'); //Container dos cartoes
    div_container.id = 'container';
    body.appendChild(div_container);

    const mensagemCarregando = document.createElement('p');
    mensagemCarregando.textContent = 'Carregando...';
    body.appendChild(mensagemCarregando);
    esconderMensagemCarregando();

    let botaoClicado = false; //Criei essa variavel p a msg de carregando aparecer só depois do botão ser clicado
    //Pq tava aparecendo "Carregando..." assim que abria a tela de cartões.

    function criarBotao(texto, url) { //Função que cria os cartões que são do endpoint do botão que foi clicado
        const botao = document.createElement('button');
        botao.innerHTML = texto;
        botao.dataset.url = url;
        botao.addEventListener('click', async () => {
            div_container.innerHTML = '';
            exibirMensagemCarregando();
            const atletas = await obterAtletas(url);
            atletas.forEach(atleta => {
                criaCartao(atleta);
            });
            esconderMensagemCarregando();
            botaoClicado = true;
        });
        return botao;
    }

    function criaCartao(entrada) { //Funcao de criar os cartões dos jogadores
        const containerAtleta = document.createElement('article');
        containerAtleta.dataset.id = entrada.id;
        containerAtleta.dataset.altura = entrada.altura;
        containerAtleta.dataset.nome_completo = entrada.nome_completo;
        containerAtleta.dataset.nascimento = entrada.nascimento;

        const imagem = document.createElement('img');
        imagem.src = entrada.imagem;
        imagem.alt = `foto de ${entrada.nome}`;

        const nome = document.createElement('p');
        nome.textContent = entrada.nome;

        containerAtleta.appendChild(imagem);
        containerAtleta.appendChild(nome);

        containerAtleta.onclick = manipulaClick;

        div_container.appendChild(containerAtleta);
    }

    function exibirMensagemCarregando() { //Exibe a msg de carregando
        if (botaoClicado) {
            mensagemCarregando.style.display = 'block';
        }
    }

    function esconderMensagemCarregando() { //Esconde a msg de carregando
        mensagemCarregando.style.display = 'none';
    }

    
    async function obterAtletas(url) { //Funçao p pegar os dados do endpoint
        const resposta = await fetch(url);
        const dados = await resposta.json();
        return dados;
    }
    
    function manipulaClick(e) { //Redireciona p a pagina d detalhes
        const artigo = e.target.closest('article');
        window.location = `detalhes.html?id=${artigo.dataset.id}`;
    }

    btn_feminino.addEventListener('click', () => { botaoClicado = true; });
    btn_masculino.addEventListener('click', () => { botaoClicado = true; }); //Event listeners p definir que um botão foi clicado
    btn_todos.addEventListener('click', () => { botaoClicado = true; });
});
