import login from './login.js';
import colinhas from './colinhas.js';




// baixa as colinhas: exibição, avaliação
(async () => {
  await colinhas.baixar({
    template: document.querySelector('#template-colinha').innerHTML,
    colinhasHtmlEl: document.querySelector('.colinhas-html .lista-colinhas'),
    colinhasCssEl: document.querySelector('.colinhas-css .lista-colinhas')
  });

  // assim que o usuario logar/sair:
  login.observe((oldUser, newUser) => {
    // 1. ativa/desativa botões de avaliação das colinhas
    colinhas.ativaBotoesDeAvaliacao(oldUser, newUser);

    // 2. ressalta a própria colinha do usuário
    colinhas.ressaltaPropriaColinha(oldUser, newUser);

    // 3. baixa e atualiza as avaliações
    colinhas.baixaAvaliacoes(oldUser, newUser);
  });


  // lida com login e logout
  login.config({
    formEl: document.login,
    logoutEl: document.querySelector('.identificacao .logout'),
    nomeUsuarioEl: document.querySelector('.identificacao .nome'),
    deslogadoEl: document.querySelector('.identificacao .nao-logado'),
    logadoEl: document.querySelector('.identificacao .logado')
  });

  colinhas.configAvaliacao(login);

})();
