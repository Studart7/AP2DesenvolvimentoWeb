document.addEventListener('DOMContentLoaded', function() {
  const token = localStorage.getItem('token'); //Pega as info do atleta pelo ID
  
    if (!token) {
      window.location.href = 'index.html'; //Se n tem token volta pro login
    }
    
  const urlParams = new URLSearchParams(window.location.search);
  const atletaId = urlParams.get('id');

  const exibirMensagemCarregando = () => {   //Funçao p mostrar msg de carregando
    const mensagemCarregando = document.createElement('p');

    document.body.appendChild(mensagemCarregando);

    return mensagemCarregando;
  };

  const esconderMensagemCarregando = (mensagemCarregando) => {  //Funçao p tirar a msg 

    document.body.removeChild(mensagemCarregando);
  };
  
  if (atletaId) {
    if (atletaId > 60){
      console.error('ID do atleta ta errado.');
      const mensagemErroI = document.createElement('p');
      mensagemErroI.textContent = 'ID do atleta não existe.';
  
      document.body.appendChild(mensagemErroI);
    }
    else{
    const endpointUrl = `https://botafogo-atletas.mange.li/${atletaId}`;

    const mensagemCarregando = exibirMensagemCarregando(); // Mostra carregando antes de receber as info

    fetch(endpointUrl)
      .then(resposta => { //Dps de usar o endpoint vê se dá uma resposta válida
        if (!resposta.ok) {
          throw new Error('Erro ao obter dados do atleta');
        }
        return resposta.json();
      })
      .then(atletaData => { //Dps de pegar os dados tira a msg de carregando e exibe dinamicamente as info em HTML 
        esconderMensagemCarregando(mensagemCarregando); 

        const detalhesAtletaDiv = document.createElement('div');
        detalhesAtletaDiv.id = 'detalhes-atleta';

        const imagem = document.createElement('img');
        imagem.src = atletaData.imagem;
        imagem.alt = `foto de ${atletaData.nome}`;

        const nome = document.createElement('h2');
        nome.textContent = atletaData.nome;

        const posicao = document.createElement('p');
        posicao.textContent = `Posição: ${atletaData.posicao}`;

        const descricao = document.createElement('p');
        descricao.textContent = `Descrição: ${atletaData.descricao}`;

        const nomeCompleto = document.createElement('p');
        nomeCompleto.textContent = `Nome Completo: ${atletaData.nome_completo}`;

        const nascimento = document.createElement('p');
        nascimento.textContent = `Nascimento: ${atletaData.nascimento}`;

        const altura = document.createElement('p');
        altura.textContent = `Altura: ${atletaData.altura}`;


        const botaoVoltar = document.createElement('button'); 
        botaoVoltar.id = 'voltar'
        botaoVoltar.textContent = 'Voltar';  //Tentei botar essa parte no css mas n tava ficando certo
        botaoVoltar.style.marginTop = '20px'; 

        botaoVoltar.onclick = function() { //Funçao p voltar p página de cartoes dos atletas
          window.history.back(); 
        };

        detalhesAtletaDiv.appendChild(imagem);
        detalhesAtletaDiv.appendChild(nome);
        detalhesAtletaDiv.appendChild(posicao);
        detalhesAtletaDiv.appendChild(descricao);
        detalhesAtletaDiv.appendChild(nomeCompleto);
        detalhesAtletaDiv.appendChild(nascimento);
        detalhesAtletaDiv.appendChild(altura);
        detalhesAtletaDiv.appendChild(botaoVoltar);

        document.body.appendChild(detalhesAtletaDiv);
      })

      .catch(error => { //Se tiver algm erro adicional
        console.error('Erro:', error);
        esconderMensagemCarregando(mensagemCarregando);
        const mensagemErro = document.createElement('p');
        mensagemErro.textContent = 'Erro ao carregar os detalhes do atleta.';

        document.body.appendChild(mensagemErro);
      });
    }
  } else {  //Se o ID do atleta não tiver no endpoint da uma msg de erro
    console.error('ID do atleta não fornecido na URL.');
    const mensagemErro = document.createElement('p');
    mensagemErro.textContent = 'ID do atleta não fornecido na URL.';

    document.body.appendChild(mensagemErro);
  }
  
});
