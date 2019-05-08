import {encodeFormParams} from './utils.js';

const backend = '/api';

const colinhas = {
  get colinhasEls() {
    return [
      ...this.colinhasHtmlEl.querySelectorAll('.colinha'),
      ...this.colinhasCssEl.querySelectorAll('.colinha')
    ];
  }
};


const defineAvaliacaoDeColinha = (colinhaEl, id, completude, beleza, favorita) => {
  const completudeEl = colinhaEl.querySelector(`.completude`);
  const belezaEl = colinhaEl.querySelector(`.beleza`);
  const favoritaEl = colinhaEl.querySelector(`.favorita`);

  completudeEl.value = completude;
  belezaEl.value = beleza;
  favoritaEl.checked = favorita == true;

  colinhaEl.dataset.idAvaliacao = id;
  colinhaEl.classList.toggle('minha-favorita', favorita == true)
}

const ativaEventosColinhas = () => {
  // coloca evento de clique nas cards
  const giradores = document.querySelectorAll('.cartao-container .girar');
    giradores.forEach(giraEl =>
      giraEl.addEventListener('click', e => {
        e.preventDefault();
        e.currentTarget.closest('.cartao-container').classList.toggle('virada')
      }
    )
  );

  // inicializa os tooltips
  const tooltips = document.querySelectorAll('.tooltipped');
  M.Tooltip.init(tooltips);

  // os input ranges
  const ranges = document.querySelectorAll("input[type=range]");
  M.Range.init(ranges);
};


colinhas.baixar = function({template, colinhasHtmlEl, colinhasCssEl}) {
  this.colinhasHtmlEl = colinhasHtmlEl;
  this.colinhasCssEl = colinhasCssEl;

  // faz requisição ajax para o backend para pegar todas as colinhas
  return fetch(`${backend}/colinha`)
    .then(r => r.json())
    .then(colinhas => {
      // apenas as de HTML
      const html = colinhas.filter(c => c.language === 'html');
      // apenas as de CSS
      const css = colinhas.filter(c => c.language === 'css');

      colinhasHtmlEl.innerHTML = html.reduce((prev, curr) => prev + mustache(template, curr), '');
      colinhasCssEl.innerHTML = css.reduce((prev, curr) => prev + mustache(template, curr), '');

      ativaEventosColinhas();
    })
    .catch(err => console.log('Erro ao pegar as colinhas do backend', err));
};


// 1. ativa/desativa botões de avaliação das colinhas
colinhas.ativaBotoesDeAvaliacao = function(oldUser, newUser) {
  if (!!newUser) {
    // está logado, então ativamos todos os botões de avaliação
    // exceto o da colinha do próprio usuário - se houver
    const colinhasDosOutros = this.colinhasEls.filter(el => !el.id.endsWith(newUser._id));
    const colinhasMinhas = this.colinhasEls.filter(el => el.id.endsWith(newUser._id));

    colinhasMinhas.forEach(el => el.querySelector('.avaliar').setAttribute('disabled', ''))
    colinhasDosOutros.forEach(el => el.querySelector('.avaliar').removeAttribute('disabled'))
  } else {
    // desativa todos os botões de avaliação
    this.colinhasEls.forEach(el => el.querySelector('.avaliar').setAttribute('disabled', ''))
  }
};

// 2. ressalta a própria colinha do usuário
colinhas.ressaltaPropriaColinha = function(oldUser, newUser) {
  this.colinhasEls.forEach(el => el.classList.toggle('minha-colinha', newUser && el.id.endsWith(newUser._id)))
};

// 3. baixa e atualiza as avaliações
colinhas.baixaAvaliacoes = function(oldUser, newUser) {
  if (!newUser) {
    this.colinhasEls.forEach(el => {
      // reseta os inputs
      defineAvaliacaoDeColinha(el, '', 5, 5, false);
      // coloca "a-avaliar" nas colinhas
      el.classList.add('a-avaliar');
      el.classList.remove('minha-colinha');
      el.classList.remove('minha-favorita');
    });
    return;
  }

  fetch(`${backend}/avaliacao/`,
    {
      headers: {
        'x-object-id-usuario': newUser._id
      }
    })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        const avaliacoes = response.data.avaliacoes || [];

        // percorre as avaliações, preenchendo os inputs de cada colinha
        avaliacoes.forEach(avaliacao => {
          // pega a colinha que foi avaliada
          const colinhaEl = this.colinhasEls.find(el => el.dataset.idColinha === avaliacao.towards);
          // atualiza os valores dos inputs dessa colinha
          if (colinhaEl) {
            defineAvaliacaoDeColinha(colinhaEl, avaliacao._id, avaliacao.completeness, avaliacao.beauty, avaliacao.favorite);
          } else {
            console.info('Estranhamente, uma avaliação foi feita para uma colinha que não existe ou que não foi carregada na página.');
          }
        });

        // marca quais ainda precisam ser avaliadas
        this.colinhasEls.forEach(el => el.classList.toggle('a-avaliar', el.dataset.idAutor !== newUser._id && !avaliacoes.some(av => av._id === el.dataset.idAvaliacao)));
      }
    })
    .catch(err => {
      M.toast({html: `Problema ao buscar suas avaliações: ${err}`});
    });
};


colinhas.configAvaliacao = function(login) {
  this.colinhasEls.forEach(colinhaEl => colinhaEl.querySelector('.avaliar').addEventListener('click', e => {
    const usuario = login.loggedUser;

    if (!usuario) {
      console.info('Estranhamente, o usuário clicou em "Avaliar" sem estar logado');
      return;
    }

    // usuário clicou em um botão de avaliar uma colinha...
    // se a colinha for dele mesmo, negar avaliação
    const colinhaEl = e.currentTarget.closest('.colinha');
    if (colinhaEl.id.endsWith(usuario._id)) {
      M.toast({html: 'Você não pode avaliar sua própria colinha'});
      e.currentTarget.setAttribute('disabled', '');
      return;
    }

    // se a colinha for de outrem, prosseguir com o salvamento no backend
    const fields = Array.from(colinhaEl.querySelectorAll('input[name]'));
    const idAvaliacaoExistente = colinhaEl.dataset.idAvaliacao;

    fetch(`${backend}/avaliacao/`, {
      headers: {
        'x-object-id-usuario': usuario._id,
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      body: encodeFormParams(fields) + `&_id=${idAvaliacaoExistente}&colinha=${colinhaEl.dataset.idColinha}`
    })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        M.toast({html: 'Avaliação salva!'});

        // gira o cartão da colinha
        colinhaEl.closest('.cartao-container').classList.toggle('virada');

        // tira o "a-salvar" desta colinha (se ainda tinha)
        colinhaEl.classList.remove('a-avaliar');

        const favorita = colinhaEl.querySelector('.favorita').checked;
        colinhaEl.classList.toggle('minha-favorita', !!favorita);

        // se esta é a favorita, tira o coraçãozinho e desmarca as outras
        if (favorita) {
          const outrasColinhas = this.colinhasEls.filter(el => el != colinhaEl);
          outrasColinhas.forEach(el => el.classList.remove('minha-favorita'));
          outrasColinhas.forEach(el => el.querySelector('.favorita').checked = false);
        }
      } else {
        M.toast({html: 'Problema ao salvar avaliação'});
      }
    })
    .catch(err => {
      M.toast({html: `Problema ao salvar avaliação: ${err}`});
    });
  }));
};

export default colinhas;
